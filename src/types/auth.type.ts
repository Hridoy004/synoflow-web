export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  user: {
    contactNumber?: string;
  };
}
