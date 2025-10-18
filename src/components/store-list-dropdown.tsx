import { List } from "@raycast/api";
import { useStores } from "../providers/stores-provider/stores-provider";
import { useStore } from "../providers/store-provider/store-provider";
import { useEffect, useState } from "react";
import type { Store } from "../types/store.types";

const StoreListDropdown = () => {
  const { stores } = useStores();
  const { store, setStore } = useStore();
  const [displayedStores, setDisplayedStores] = useState<Store[] | null>(null);

  useEffect(() => {
    // HACK: Raycast's Dropdown doesn't use the initial value passed to show the selected item, so we make sure the first render is always the current store
    if (displayedStores || !store) return;
    setDisplayedStores(
      stores.toSorted((a, b) => {
        if (a.id === store.id) return -1;
        if (b.id === store.id) return 1;
        return a.name.localeCompare(b.name);
      }),
    );
  }, [displayedStores, store, stores]);

  if (!store || stores.length <= 1 || !displayedStores) return null;

  return (
    <List.Dropdown id="store-dropdown" tooltip="Select Store" value={store.id} onChange={setStore}>
      {displayedStores.map((store) => (
        <List.Dropdown.Item key={store.id} title={store.name} value={store.id} keywords={[store.name, store.slug]} />
      ))}
    </List.Dropdown>
  );
};

export default StoreListDropdown;
