import { CollectionWorkspace } from "@/components/admin/collection-workspace";
import { ContentEditor } from "@/components/admin/content-editor";

export default function DeliveryPage() {
  return (
    <>
      <ContentEditor contentKey="delivery-settings" />
      <div className="admin-section-divider" />
      <CollectionWorkspace resource="delivery" />
    </>
  );
}
