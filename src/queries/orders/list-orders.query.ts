import { showFailureToast, useCachedPromise } from "@raycast/utils";
import { useStore } from "../../hooks/use-store";
import type { Store } from "../../types/store.types";
import { PaynowAPI } from "../../utils/paynow-api";

export const useOrdersList = ({ storeId }: { storeId?: string } = {}) => {
  const [store] = useStore({ id: storeId });

  return useCachedPromise(
    (store: Store | null) => async (options) => {
      if (!store) {
        return { data: [], hasMore: false, cursor: undefined };
      }
      const api = new PaynowAPI({ apiKey: store.apiKey });

      try {
        const response = await api.management.order.getOrders({
          params: {
            path: {
              storeId: store.id,
            },
            query: {
              limit: 100,
              ...(options.lastItem ? { cursor: options.lastItem.id } : {}),
            },
          },
        });
        const hasMore = response.length === 100;
        return { data: response.slice(0, 99), hasMore, cursor: hasMore ? response[99].id : undefined };
      } catch (error) {
        await showFailureToast({ title: "Failed to fetch orders", error });
        return { data: [], hasMore: false, cursor: undefined };
      }
    },
    [store],
    {
      keepPreviousData: true,
    },
  );
};
