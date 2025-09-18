import { Action, ActionPanel, List } from "@raycast/api";
import { useStore } from "../hooks/use-store";
import { useListProducts } from "../queries/products/list-products.query";
import ProductListItem from "./product-list-item";
import ProductDetails from "./product-details";

const ProductList = () => {
  const { data: products, isLoading } = useListProducts();
  const [store] = useStore();

  return (
    <List isLoading={isLoading} navigationTitle={`Products • ${store?.name || "No Store Selected"}`}>
      {products?.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          actions={
            <ActionPanel title={product.name}>
              <Action.Push title="View Details" target={<ProductDetails product={product} />} />
              <Action.OpenInBrowser
                title="Open"
                url={`https://dashboard.paynow.gg/products/${product.id}?s=${store?.slug}`}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default ProductList;
