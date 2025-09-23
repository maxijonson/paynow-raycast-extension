import { Action, ActionPanel, List } from "@raycast/api";
import type { Management } from "@ywwa/paylater/dist/generated";
import { useCallback } from "react";
import { withProviders } from "../../hocs/with-providers";
import { useStore } from "../../hooks/use-store";

export interface TagDetailsProps {
  tag: Management.components["schemas"]["TagDto"];
}

const TagDetails = ({ tag }: TagDetailsProps) => {
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
              <Action.OpenInBrowser title="Open" url={`https://dashboard.paynow.gg/tags/${tag.id}?s=${store?.slug}`} />
            </ActionPanel>
          }
        />
      );
    },
    [tag.id, store?.slug],
  );

  return (
    <List navigationTitle={tag.name}>
      <Line name="ID" value={tag.id} />
      <Line name="Name" value={tag.name} />
      <Line name="Slug" value={tag.slug} />
      <Line name="Created At" value={new Date(tag.created_at || 0).toLocaleString()} hidden={!tag.created_at} />
      <Line name="Updated At" value={new Date(tag.updated_at || 0).toLocaleString()} hidden={!tag.updated_at} />
      {tag.image_url && (
        <List.Item
          title="Image"
          accessories={[{ icon: tag.image_url || undefined }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy Image URL" content={tag.image_url || ""} />
              <Action.OpenInBrowser title="Open Image" url={tag.image_url} />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
};

export default withProviders(TagDetails);
