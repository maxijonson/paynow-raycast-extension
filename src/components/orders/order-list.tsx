import { Action, ActionPanel, List } from "@raycast/api";
import { useStore } from "../../hooks/use-store";
import { useOrdersList } from "../../queries/orders/list-orders.query";
import OrderListItem from "./order-list-item";
import OrderDetails from "./order-details";

const OrderList = () => {
  const { data: orders, isLoading } = useOrdersList();
  const [store] = useStore();

  return (
    <List isLoading={isLoading} navigationTitle={`Orders • ${store?.name || "No Store Selected"}`}>
      {orders?.map((order) => (
        <OrderListItem
          key={order.id}
          order={order}
          actions={
            <ActionPanel title={order.pretty_id}>
              <Action.Push title="View Details" target={<OrderDetails order={order} />} />
              <Action.CopyToClipboard title="Copy Order ID" content={order.id} />
              <Action.CopyToClipboard title="Copy Order Pretty ID" content={order.pretty_id} />
              <Action.OpenInBrowser
                title="Open"
                url={`https://dashboard.paynow.gg/orders/${order.id}?s=${store?.slug}`}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default OrderList;
