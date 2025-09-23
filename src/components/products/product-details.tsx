import { Action, ActionPanel, List } from "@raycast/api";
import type { Management } from "@ywwa/paylater/dist/generated";
import { toPriceString } from "../../utils/to-price-string";
import { useCallback, useMemo } from "react";
import { useStore } from "../../hooks/use-store";
import { withProviders } from "../../hocs/with-providers";

export interface ProductDetailsProps {
  product: Management.components["schemas"]["ProductDto"];
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [store] = useStore();

  const status = useMemo(() => {
    if (product.is_hidden) return "Hidden";
    const now = new Date();
    if (product.enabled_at && new Date(product.enabled_at) > now) return "Scheduled";
    if (product.enabled_until && new Date(product.enabled_until) < now) return "Expired";
    return "Active";
  }, [product.enabled_at, product.enabled_until, product.is_hidden]);

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
                url={`https://dashboard.paynow.gg/products/${product.id}?s=${store?.slug}`}
              />
            </ActionPanel>
          }
        />
      );
    },
    [product.id, store?.slug],
  );

  return (
    <List navigationTitle={product.name}>
      <Line name="ID" value={product.id} />
      <Line name="Name" value={product.name} />
      <Line name="Slug" value={product.slug} />
      <Line name="Status" value={status} />
      <Line
        name="Tags"
        value={product.tags.map((tag) => tag.name).join(", ") || "None"}
        hidden={product.tags.length === 0}
      />
      <Line name="Price" value={toPriceString(product)} />
      <Line name="Type" value="Hybrid" hidden={!product.allow_one_time_purchase || !product.allow_subscription} />
      <Line name="Type" value="One-time" hidden={!product.allow_one_time_purchase} />
      <Line name="Type" value="Subscription" hidden={!product.allow_subscription} />
      <Line name="Created At" value={new Date(product.created_at || 0).toLocaleString()} hidden={!product.created_at} />
      <Line name="Updated At" value={new Date(product.updated_at || 0).toLocaleString()} hidden={!product.updated_at} />
      {product.image_url && (
        <List.Item
          title="Image"
          accessories={[{ icon: product.image_url || undefined }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy Image URL" content={product.image_url || ""} />
              <Action.OpenInBrowser title="Open Image" url={product.image_url} />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
};

export default withProviders(ProductDetails);
