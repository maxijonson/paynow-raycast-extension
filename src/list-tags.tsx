import { List } from "@raycast/api";
import TagList from "./components/tags/tag-list";
import { withProviders } from "./hocs/with-providers";
import { withStores } from "./hocs/with-stores";

const ListTagsCommand = () => {
  return <TagList />;
};

export default withProviders(withStores(ListTagsCommand), { Fallback: () => <List isLoading /> });
