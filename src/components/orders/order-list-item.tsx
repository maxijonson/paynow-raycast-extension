import { List } from "@raycast/api";
import type { Management } from "@ywwa/paylater/dist/generated";
import { useMemo } from "react";

const OrderListItem = ({
  actions,
  detail,
  quickLook,
  order,
}: { order: Management.components["schemas"]["OrderDto"] } & Pick<
  List.Item.Props,
  "actions" | "detail" | "quickLook"
>) => {
  const keywords = useMemo<string[]>(() => {
    const kw = [
      order.id,
      order.pretty_id,
      order.customer.id,
      order.customer.profile?.id,
      order.customer.profile?.name,
      order.customer.steam?.id,
      order.customer.steam?.name,
      order.customer.minecraft?.id,
      order.customer.minecraft?.name,
      order.customer.xbox_xuid,
      order.subscription_id,
      order.type,
    ];
    return kw.filter(Boolean) as string[];
  }, [
    order.customer.id,
    order.customer.minecraft?.id,
    order.customer.minecraft?.name,
    order.customer.profile?.id,
    order.customer.profile?.name,
    order.customer.steam?.id,
    order.customer.steam?.name,
    order.customer.xbox_xuid,
    order.id,
    order.pretty_id,
    order.subscription_id,
    order.type,
  ]);

  const title = useMemo(() => {
    if (order.lines.length !== 1) {
      return `${order.lines.length} items`;
    }
    const line = order.lines[0];
    return line.product_name;
  }, [order.lines]);

  return (
    <List.Item
      id={order.id}
      key={order.id}
      title={title}
      subtitle={order.pretty_id}
      icon={order.customer.profile?.avatar_url || undefined}
      accessories={[
        { date: order.created_at ? new Date(order.created_at) : undefined },
        { text: order.total_amount_str },
      ]}
      keywords={keywords}
      actions={actions}
      detail={detail}
      quickLook={quickLook}
    />
  );
};

export default OrderListItem;
