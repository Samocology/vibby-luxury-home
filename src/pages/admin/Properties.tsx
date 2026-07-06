import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { AddPropertyForm } from "@/components/add-property-form";
import { Plus, Search, Trash2, Eye, Pencil } from "lucide-react";
import { properties, fmtUSD } from "@/lib/data";
import { StatusPill } from "@/lib/admin-ui";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { toast } from "sonner";

type StatusFilter = "All" | "Active" | "Pending" | "Sold";

export default function AdminProperties() {
  useDocumentTitle("Properties — LuxeEstate Admin");
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  const filtered = useMemo(() =>
    properties.filter((p) =>
      (filter === "All" || p.status === filter) &&
      (!query || p.title.toLowerCase().includes(query.toLowerCase()) || p.location.toLowerCase().includes(query.toLowerCase()))
    ), [filter, query]);

  const counts = {
    total: properties.length,
    Active: properties.filter((p) => p.status === "Active").length,
    Pending: properties.filter((p) => p.status === "Pending").length,
    Sold: properties.filter((p) => p.status === "Sold").length,
  };

  const toggle = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));

  return (
    <AdminShell
      title="Properties"
      breadcrumb="Admin · Properties"
      actions={
        <Sheet open={openAdd} onOpenChange={setOpenAdd}>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-2 h-3.5 w-3.5" />Add Property</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle>Add a new property</SheetTitle>
              <SheetDescription>Fill in the details below to publish a new listing.</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <AddPropertyForm compact onDone={() => setOpenAdd(false)} />
            </div>
          </SheetContent>
        </Sheet>
      }
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Total Listings" value={counts.total} tone="muted" />
        <StatTile label="Active" value={counts.Active} tone="success" />
        <StatTile label="Pending" value={counts.Pending} tone="warning" />
        <StatTile label="Sold" value={counts.Sold} tone="primary" />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
          {(["All", "Active", "Pending", "Sold"] as StatusFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${filter === t ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              {t} {t === "All" ? counts.total : counts[t]}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} className="w-64 pl-9" placeholder="Search properties…" />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-card shadow-soft">
        {selected.length > 0 && (
          <div className="flex items-center justify-between border-b border-border bg-brand-soft/40 px-4 py-2.5 text-sm">
            <span className="font-medium">{selected.length} selected</span>
            <Button variant="destructive" size="sm" onClick={() => { toast.success(`Deleted ${selected.length} listings (demo)`); setSelected([]); }}>
              <Trash2 className="mr-2 h-3.5 w-3.5" />Delete
            </Button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5"><Checkbox checked={selected.length === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></th>
                {["Property", "Type", "Price", "Status", "Beds / Baths", "Area", "Agent", "Views", ""].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-2.5"><Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} /></td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-9 w-12 rounded object-cover" />
                      <div>
                        <p className="text-sm font-medium">{p.title}</p>
                        <p className="text-[11px] text-muted-foreground">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5"><span className="rounded-md bg-muted px-2 py-0.5 text-[11px]">{p.type}</span></td>
                  <td className="px-4 py-2.5 text-sm font-semibold text-primary">{fmtUSD(p.price)}</td>
                  <td className="px-4 py-2.5"><StatusPill status={p.status} /></td>
                  <td className="px-4 py-2.5 text-sm">{p.beds} bd · {p.baths} ba</td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground">{p.sqft.toLocaleString()} sqft</td>
                  <td className="px-4 py-2.5 text-sm">{p.agent}</td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground">{p.views.toLocaleString()}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-0.5">
                      <Button asChild variant="ghost" size="icon" className="h-7 w-7"><Link to={`/properties/${p.id}`}><Eye className="h-3.5 w-3.5" /></Link></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-10 text-center text-sm text-muted-foreground">No properties match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>Showing <strong className="text-foreground">{filtered.length}</strong> of {properties.length}</span>
        </div>
      </div>
    </AdminShell>
  );
}

function StatTile({ label, value, tone }: { label: string; value: number; tone: "muted" | "success" | "warning" | "primary" }) {
  const toneMap = {
    muted: "bg-muted text-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    primary: "bg-brand-soft text-primary",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${toneMap[tone]}`} />
      </div>
      <p className="mt-2 text-2xl font-display">{value}</p>
    </div>
  );
}
