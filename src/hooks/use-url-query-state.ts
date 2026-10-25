"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryValue = string | number | null | undefined;
type QueryUpdates = Record<string, QueryValue>;

export function useUrlQueryState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const get = useCallback(
    (key: string, fallback = "") => searchParams.get(key) ?? fallback,
    [searchParams],
  );

  const getPage = useCallback(
    (key = "page") => {
      const value = Number(searchParams.get(key));
      return Number.isSafeInteger(value) && value > 0 ? value : 1;
    },
    [searchParams],
  );

  const setMany = useCallback(
    (updates: QueryUpdates) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const clear = useCallback(
    (...keys: string[]) => {
      const updates = Object.fromEntries(keys.map((key) => [key, null]));
      setMany(updates);
    },
    [setMany],
  );

  return { get, getPage, set: setMany, clear };
}
