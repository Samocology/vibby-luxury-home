import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye, Pencil, Trash2, ArrowUpRight, DollarSign, Building2, Inbox, CheckCircle2 } from "lucide-react";
import { properties, inquiries, fmtUSD } from "@/lib/data";
import { StatusPill, channelBadge } from "@/lib/admin-ui";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Dashboard() {
  useDocumentTitle("Dashboard — LuxeEstate Admin");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const values = [0.92, 0.78, 1.05, 1.12, 1.18, 1.28, 1.42];
  const max = Math.max(...values);
  return (
    <AdminShell
      title="Dashboard Overview"
      breadcrumb="Welcome back, James · Tuesday, 22 July 2025"
      actions={<Button asChild size="sm"><Link to="/admin/properties/new"><Plus className="mr-2 h-3.5 w-3.5" />Add Property</Link></Button>}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Total Revenue" value="$8.4M" delta="+14.2% from last month" />
        <StatCard icon={Building2} label="Active Listings" value="86" delta="+5 new this week" />
        <StatCard icon={Inbox} label="New Inquiries" value="47" delta="7 unread · 3 urgent" />
        <StatCard icon={CheckCircle2} label="Conversions" value="23.4%" delta="+3.1% vs last quarter" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-base font-semibold">Revenue Overview</h3>
              <p className="text-[11px] text-muted-foreground">Monthly revenue · Jan – Jul 2025</p>
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </div>
          <div className="mt-5 flex h-44 items-end gap-2">
            {months.map((m, i) => (
              <div key={m} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-full w-full items-end">
                  <div className="w-full rounded-t-md gradient-brand transition" style={{ height: `${(values[i] / max) * 100}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{m}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-3">
            <Mini label="This Month" value="$1.42M" />
            <Mini label="Last Month" value="$1.28M" />
            <Mini label="YTD Total" value="$8.41M" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-[11px] text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-3 space-y-3">
            {inquiries.slice(0, 4).map((i) => (
              <div key={i.id} className="flex gap-3 border-b border-border pb-3 last:border-0">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-primary">
                  {i.contact.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{i.contact}</p>
                    <Badge className={channelBadge(i.channel)}>{i.channel}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{i.received.split("·")[0]}</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-foreground/80">{i.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between p-5">
          <div>
            <h3 className="text-base font-semibold">Recent Property Listings</h3>
            <p className="text-[11px] text-muted-foreground">86 active · 12 pending · 44 sold</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Search className="mr-2 h-3.5 w-3.5" />Search</Button>
            <Button asChild size="sm"><Link to="/admin/properties/new"><Plus className="mr-2 h-3.5 w-3.5" />Add New</Link></Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-y border-border bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>
                {["Property", "Type", "Price", "Status", "Agent", "Views", "Listed", ""].map((h) => <th key={h} className="px-4 py-2.5 text-left font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {properties.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-9 w-12 rounded object-cover" />
                      <div>
                        <p className="text-sm font-medium">{p.title}</p>
                        <p className="text-[11px] text-muted-foreground">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-sm">{p.type}</td>
                  <td className="px-4 py-2.5 text-sm font-semibold">{fmtUSD(p.price)}</td>
                  <td className="px-4 py-2.5"><StatusPill status={p.status} /></td>
                  <td className="px-4 py-2.5 text-sm">{p.agent}</td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground">{p.views.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground">{p.listed.split(",")[0]}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-0.5">
                      <Button asChild variant="ghost" size="icon" className="h-7 w-7"><Link to={`/properties/${p.id}`}><Eye className="h-3.5 w-3.5" /></Link></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({ icon: Icon, label, value, delta }: { icon: typeof DollarSign; label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-soft text-primary"><Icon className="h-3.5 w-3.5" /></span>
      </div>
      <p className="mt-2 text-2xl font-display">{value}</p>
      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-success"><ArrowUpRight className="h-3 w-3" /> {delta}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-primary">{value}</p>
    </div>
  );
}
