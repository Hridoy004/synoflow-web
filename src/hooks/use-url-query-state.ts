"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlQueryState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams],
  );

  const set = useCallback(
    (updates: string | Record<string, string | number | null>, value?: string | number | null) => {
      const params = new URLSearchParams(searchParams.toString());
      const entries =
        typeof updates === "string" ? [[updates, value ?? null] as const] : Object.entries(updates);
      for (const [key, nextValue] of entries) {
        if (nextValue === null || nextValue === "" || nextValue === undefined) params.delete(key);
        else params.set(key, String(nextValue));
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const remove = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const get = useCallback((key: string) => searchParams.get(key) ?? "", [searchParams]);
  const getPage = useCallback(() => {
    const page = Number(searchParams.get("page"));
    return Number.isInteger(page) && page > 0 ? page : 1;
  }, [searchParams]);

  return { ...values, get, getPage, set, remove };
}
