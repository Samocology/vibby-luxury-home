import { AdminShell } from "@/components/admin-shell";
import { AddPropertyForm } from "@/components/add-property-form";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function AddProperty() {
  useDocumentTitle("Add Property — LuxeEstate Admin");
  return (
    <AdminShell title="Add Property" breadcrumb="Admin · Properties · Add">
      <AddPropertyForm />
    </AdminShell>
  );
}
