import { useCachedPromise } from "@raycast/utils";
import { useStore } from "../../hooks/use-store";
import type { Store } from "../../types/store.types";
import { PaynowAPI } from "../../utils/paynow-api";
import { showPaynowError } from "../../utils/show-paynow-error";

export const useWebhookEventsList = (webhookId: string, { storeId }: { storeId?: string } = {}) => {
  const [store] = useStore({ id: storeId });

  return useCachedPromise(
    async (store: Store | null) => {
      if (!store) {
        return null;
      }
      const api = new PaynowAPI({ apiKey: store.apiKey });

      try {
        const response = await api.management.webhook.getHistory({
          params: {
            path: {
              storeId: store.id,
              webhookId,
            },
          },
        });
        return response;
      } catch (error) {
        await showPaynowError(error);
        return null;
      }
    },
    [store],
  );
};
