import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Settings() {
  useDocumentTitle("Settings — LuxeEstate Admin");
  return (
    <AdminShell title="Settings" breadcrumb="Admin · System · Settings">
      <form className="grid gap-5 lg:grid-cols-[1fr_300px]" onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved"); }}>
        <div className="space-y-5">
          <Card title="Organization">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Company name"><Input defaultValue="LuxeEstate" /></Field>
              <Field label="Website"><Input defaultValue="luxeestate.com" /></Field>
              <Field label="Support email"><Input type="email" defaultValue="concierge@luxeestate.com" /></Field>
              <Field label="Phone"><Input defaultValue="+1 (310) 555-0188" /></Field>
            </div>
            <Field label="About"><Textarea rows={3} defaultValue="LuxeEstate is the world's most trusted platform for luxury real estate." /></Field>
          </Card>
          <Card title="Notifications">
            {[
              ["New inquiries", true],
              ["Listing updates", true],
              ["Weekly performance digest", false],
              ["Campaign reports", true],
            ].map(([label, on]) => (
              <div key={label as string} className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
                <p className="text-sm">{label}</p>
                <Switch defaultChecked={on as boolean} />
              </div>
            ))}
          </Card>
        </div>
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Plan</h3>
            <p className="mt-1.5 text-[11px] text-muted-foreground">Enterprise · 142 listings, 12 agents</p>
            <Button variant="outline" className="mt-3 w-full" size="sm">Manage billing</Button>
          </div>
          <Button type="submit" className="w-full">Save changes</Button>
        </aside>
      </form>
    </AdminShell>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-[11px]">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
