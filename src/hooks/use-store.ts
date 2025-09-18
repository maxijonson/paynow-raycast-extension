import { useCallback, useMemo } from "react";
import { Store } from "../types/store.types";
import { useZodLocalStorage } from "./use-zod-local-storage";
import { useStores } from "../providers/stores-provider/stores-provider";

export const useStore = ({
  id,
}: {
  id?: string;
} = {}) => {
  const { stores } = useStores();
  const { value: store, setValue: setStore } = useZodLocalStorage("currentStore", Store, null);

  const currentStore = useMemo(() => {
    if (id) {
      return stores.find((s) => s.id === id) ?? null;
    }
    return store ?? stores[0] ?? null;
  }, [id, stores, store]);

  const changeStore = useCallback(
    (id: string) => {
      const matchedStore = stores.find((store) => store.id === id);
      if (matchedStore) {
        setStore(matchedStore);
        return true;
      }
      return false;
    },
    [stores, setStore],
  );

  return [currentStore, changeStore] as const;
};
