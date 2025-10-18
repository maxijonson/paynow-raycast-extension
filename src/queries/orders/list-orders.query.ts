import { useCachedPromise } from "@raycast/utils";
import { useStore } from "../../providers/store-provider/store-provider";
import type { Store } from "../../types/store.types";
import { PaynowAPI } from "../../utils/paynow-api";
import { showPaynowError } from "../../utils/show-paynow-error";

export const useOrdersList = () => {
  const { store } = useStore();

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
        await showPaynowError(error);
        return { data: [], hasMore: false, cursor: undefined };
      }
    },
    [store],
    {
      keepPreviousData: true,
    },
  );
};
