import { useCachedPromise } from "@raycast/utils";
import { useStore } from "../../hooks/use-store";
import type { Store } from "../../types/store.types";
import { PaynowAPI } from "../../utils/paynow-api";

export const useListProducts = ({ id }: { id?: string } = {}) => {
  const [store] = useStore({ id });

  return useCachedPromise(
    async (store: Store | null) => {
      if (!store) {
        return [];
      }
      const api = new PaynowAPI({ apiKey: store.apiKey });
      const response = await api.management.product.getProducts({
        params: {
          path: {
            storeId: store.id,
          },
        },
      });
      return response;
    },
    [store],
  );
};
