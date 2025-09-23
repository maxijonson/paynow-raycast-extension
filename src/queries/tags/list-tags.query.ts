import { useCachedPromise, showFailureToast } from "@raycast/utils";
import { useStore } from "../../hooks/use-store";
import type { Store } from "../../types/store.types";
import { PaynowAPI } from "../../utils/paynow-api";

export const useTagsList = ({ storeId }: { storeId?: string } = {}) => {
  const [store] = useStore({ id: storeId });

  return useCachedPromise(
    async (store: Store | null) => {
      if (!store) {
        return [];
      }
      const api = new PaynowAPI({ apiKey: store.apiKey });

      try {
        const response = await api.management.tag.getTags({
          params: {
            path: {
              storeId: store.id,
            },
          },
        });
        return response;
      } catch (error) {
        await showFailureToast({ title: "Failed to fetch tags", error });
        return [];
      }
    },
    [store],
  );
};
