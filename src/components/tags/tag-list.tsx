import { Action, ActionPanel, List } from "@raycast/api";
import { useStore } from "../../hooks/use-store";
import { useTagsList } from "../../queries/tags/list-tags.query";
import TagListItem from "./tag-list-item";
import TagDetails from "./tag-details";

const TagList = () => {
  const { data: tags, isLoading } = useTagsList();
  const [store] = useStore();

  return (
    <List isLoading={isLoading} navigationTitle={`Tags • ${store?.name || "No Store Selected"}`}>
      {tags?.map((tag) => (
        <TagListItem
          key={tag.id}
          tag={tag}
          actions={
            <ActionPanel title={tag.name}>
              <Action.Push title="View Details" target={<TagDetails tag={tag} />} />
              <Action.CopyToClipboard title="Copy Tag ID" content={tag.id} />
              <Action.OpenInBrowser title="Open" url={`https://dashboard.paynow.gg/tags/${tag.id}?s=${store?.slug}`} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default TagList;
