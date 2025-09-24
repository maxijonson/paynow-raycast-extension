import { Action, ActionPanel, List } from "@raycast/api";
import type { Management } from "@ywwa/paylater/dist/generated";
import { useCallback } from "react";
import { withProviders } from "../../hocs/with-providers";
import { useStore } from "../../hooks/use-store";

export interface OrderDetailsProps {
  order: Management.components["schemas"]["OrderDto"];
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const [store] = useStore();

  const Line = useCallback(
    ({ name, value, hidden = false }: { name: string; value: string; hidden?: boolean }) => {
      if (hidden) return null;
      return (
        <List.Item
          title={name}
          accessories={[{ text: value }]}
          keywords={[value, name + value, value + name]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy Value" content={value} />
              <Action.OpenInBrowser
                title="Open"
                url={`https://dashboard.paynow.gg/orders/${order.id}?s=${store?.slug}`}
              />
            </ActionPanel>
          }
        />
      );
    },
    [order.id, store?.slug],
  );

  return (
    <List navigationTitle={order.pretty_id}>
      <Line name="ID" value={order.id} />
      <Line name="Pretty ID" value={order.pretty_id} />
      <Line name="Created At" value={new Date(order.created_at || 0).toLocaleString()} hidden={!order.created_at} />
    </List>
  );
};

export default withProviders(OrderDetails);
