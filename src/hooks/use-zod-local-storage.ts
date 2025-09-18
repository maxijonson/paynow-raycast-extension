import { useLocalStorage } from "@raycast/utils";
import type { ZodType } from "zod";

type LocalStorage<T> = undefined extends T
  ? ReturnType<typeof useLocalStorage<T>>
  : Omit<ReturnType<typeof useLocalStorage<T>>, "value"> & {
      value: T;
    };

type ZodLocalStorage<T> = LocalStorage<T> & {
  isValid: boolean;
};

export function useZodLocalStorage<T>(key: string, schema: ZodType<T>, initialValue?: undefined): ZodLocalStorage<T | undefined>;
export function useZodLocalStorage<T>(key: string, schema: ZodType<T>, initialValue: T): ZodLocalStorage<T>;
export function useZodLocalStorage<T>(key: string, schema: ZodType<T>, initialValue?: T) {
  const localStorage = useLocalStorage<T>(key, initialValue);
  const parsed = schema.safeParse(localStorage.value);

  return {
    ...localStorage,
    isValid: parsed.success,
    value: parsed.success ? parsed.data : initialValue,
    rawValue: localStorage.value,
  };
}
