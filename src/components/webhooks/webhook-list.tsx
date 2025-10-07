import { Action, ActionPanel, List } from "@raycast/api";
import { useStore } from "../../hooks/use-store";
import { useWebhooksList } from "../../queries/webhooks/list-webhooks.query";
import WebhookListItem from "./webhook-list-item";
import WebhookEventList from "./events/webhook-event-list";

const WebhookList = () => {
  const { data: webhooks, isLoading } = useWebhooksList();
  const [store] = useStore();

  return (
    <List isLoading={isLoading} navigationTitle={`Webhooks • ${store?.name || "No Store Selected"}`}>
      {webhooks?.map((webhook) => (
        <WebhookListItem
          key={webhook.id}
          webhook={webhook}
          actions={
            <ActionPanel title={webhook.url}>
              <Action.Push title="View Events" target={<WebhookEventList webhook={webhook} />} />
              <Action.CopyToClipboard title="Copy Webhook ID" content={webhook.id} />
              <Action.OpenInBrowser title="Open" url={`https://dashboard.paynow.gg/webhooks/${webhook.id}?s=${store?.slug}`} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default WebhookList;
