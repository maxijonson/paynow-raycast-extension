import { List } from "@raycast/api";
import type { Management } from "@ywwa/paylater/dist/generated";
import { useMemo } from "react";
import { toPriceString } from "../../utils/to-price-string";

const ProductListItem = ({
  actions,
  detail,
  quickLook,
  product,
}: { product: Management.components["schemas"]["ProductDto"] } & Pick<
  List.Item.Props,
  "actions" | "detail" | "quickLook"
>) => {
  const keywords = useMemo<string[]>(() => {
    const kw = [product.id, product.slug, ...product.tags.flatMap((tag) => [tag.name, tag.slug])];
    if (product.label) {
      kw.push(product.label);
    }
    if (product.allow_subscription) {
      kw.push("subscription", "recurring");
    }
    if (product.allow_one_time_purchase) {
      kw.push("one-time", "one time", "purchase");
    }
    return kw;
  }, [
    product.allow_one_time_purchase,
    product.allow_subscription,
    product.id,
    product.label,
    product.slug,
    product.tags,
  ]);

  const subtitle = useMemo<string>(() => {
    const parts: string[] = [];

    parts.push(product.tags.map((tag) => tag.name).join(", "));

    return parts.join(" • ");
  }, [product]);

  return (
    <List.Item
      id={product.id}
      key={product.id}
      title={product.name}
      subtitle={subtitle}
      keywords={keywords}
      accessories={[{ text: toPriceString(product) }]}
      icon={product.image_url || undefined}
      actions={actions}
      detail={detail}
      quickLook={quickLook}
    />
  );
};

export default ProductListItem;
