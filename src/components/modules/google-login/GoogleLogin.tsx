"use client";

import {
  type CredentialResponse,
  type GsiButtonConfiguration,
  type IdConfiguration,
  useGoogleOAuth as useGoogleOAuthContext,
} from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "@/components/ui/toast";
import { useGoogleOAuth as useGoogleOAuthMutation } from "@/hooks";

type GoogleIdentityApi = {
  initialize: (configuration: IdConfiguration) => void;
  renderButton: (
    container: HTMLElement,
    configuration: GsiButtonConfiguration,
  ) => void;
};

type GoogleIdentityState = {
  clientId: string;
  initialized: boolean;
  activeHandler: ((response: CredentialResponse) => void) | null;
};

type GoogleWindow = Window & {
  google?: {
    accounts?: {
      id?: GoogleIdentityApi;
    };
  };
  __synoflowGoogleIdentityState?: GoogleIdentityState;
};

const buttonConfiguration: GsiButtonConfiguration = {
  type: "standard",
  theme: "outline",
  shape: "pill",
  text: "continue_with",
};

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleOAuthMutation();
  const { clientId, scriptLoadedSuccessfully } = useGoogleOAuthContext();
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Logged in Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };

  const successHandlerRef = useRef(handleGoogleSuccess);
  successHandlerRef.current = handleGoogleSuccess;
  const errorHandlerRef = useRef(handleGoogleError);
  errorHandlerRef.current = handleGoogleError;

  const dispatchCredentialResponse = useCallback(
    (response: CredentialResponse) => {
      if (!response.credential) {
        errorHandlerRef.current();
        return;
      }
      successHandlerRef.current(response);
    },
    [],
  );

  useEffect(() => {
    if (!scriptLoadedSuccessfully) {
      return;
    }

    const googleWindow = window as GoogleWindow;
    const identityApi = googleWindow.google?.accounts?.id;
    if (!identityApi) {
      throw new Error(
        "Google Identity Services loaded without its identity API.",
      );
    }

    let state = googleWindow.__synoflowGoogleIdentityState;
    if (state && state.clientId !== clientId) {
      throw new Error(
        "Google Identity Services is already initialized with a different client ID.",
      );
    }
    if (!state) {
      state = {
        clientId,
        initialized: false,
        activeHandler: null,
      };
      googleWindow.__synoflowGoogleIdentityState = state;
    }

    state.activeHandler = dispatchCredentialResponse;
    if (!state.initialized) {
      identityApi.initialize({
        client_id: clientId,
        callback: (response) => state?.activeHandler?.(response),
      });
      state.initialized = true;
    }

    const button = buttonRef.current;
    if (!button) {
      return;
    }

    button.replaceChildren();
    identityApi.renderButton(button, buttonConfiguration);

    return () => {
      if (state?.activeHandler === dispatchCredentialResponse) {
        state.activeHandler = null;
      }
      button.replaceChildren();
    };
  }, [clientId, dispatchCredentialResponse, scriptLoadedSuccessfully]);

  return <div ref={buttonRef} style={{ height: 40 }} />;
}
