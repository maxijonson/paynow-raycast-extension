import React, { useCallback, useMemo } from "react";
import { useZodLocalStorage } from "../../hooks/use-zod-local-storage";
import { Store } from "../../types/store.types";

export interface StoresContextValue {
  stores: Store[];
  areStoresValid: boolean;
  removeStore: (id: string) => Promise<void>;
  removeStores: () => Promise<void>;
  setStores: (stores: Store[]) => Promise<void>;
  addStore: (store: Store) => Promise<void>;
}

const StoresContext = React.createContext<StoresContextValue | null>(null);

export const useStores = () => {
  const context = React.useContext(StoresContext);
  if (!context) {
    throw new Error("useStores must be used within a StoresProvider");
  }
  return context;
};

export interface StoresProviderProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

const StoresProvider = ({ children, fallback = null }: StoresProviderProps) => {
  const {
    isLoading,
    value: stores,
    isValid: areStoresValid,
    removeValue: removeStores,
    setValue: setStores,
  } = useZodLocalStorage("stores", Store.array(), []);

  const removeStore = useCallback<StoresContextValue["removeStore"]>(
    async (id) => {
      const updatedStores = stores.filter((store) => store.id !== id);
      await setStores(updatedStores);
    },
    [stores, setStores],
  );

  const addStore = useCallback<StoresContextValue["addStore"]>(
    async (store) => {
      await setStores([...stores.filter((s) => s.id !== store.id), store]);
    },
    [stores, setStores],
  );

  const providerValue = useMemo<StoresContextValue>(
    () => ({
      addStore,
      areStoresValid,
      removeStore,
      removeStores,
      setStores,
      stores,
    }),
    [addStore, areStoresValid, removeStore, removeStores, setStores, stores],
  );

  if (isLoading) {
    return fallback;
  }

  return <StoresContext.Provider value={providerValue}>{children}</StoresContext.Provider>;
};

export default (props: StoresProviderProps) => {
  const parentCtx = React.useContext(StoresContext);
  if (parentCtx) {
    return props.children;
  }
  return <StoresProvider {...props} />;
};
