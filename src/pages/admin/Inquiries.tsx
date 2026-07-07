import { useState } from "react";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Bell, Mail, MessageCircle, Globe, Inbox, AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { inquiries, propertyById, fmtUSD } from "@/lib/data";
import { channelBadge } from "@/lib/admin-ui";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Inquiries() {
  useDocumentTitle("Inquiries — Vibby Luxury Home Admin");
  const [activeId, setActiveId] = useState(inquiries[0].id);
  const active = inquiries.find((i) => i.id === activeId)!;
  const prop = propertyById(active.propertyId);

  return (
    <AdminShell title="Inquiries" breadcrumb="Admin · Engagement · Inquiries" actions={<Button size="sm">Compose Reply</Button>}>
      <div className="grid gap-3 md:grid-cols-5">
        <Stat icon={Inbox} label="Total" value="248" />
        <Stat icon={AlertCircle} label="Unread" value="7" tone="destructive" />
        <Stat icon={CheckCircle2} label="Replied" value="189" tone="success" />
        <Stat icon={Clock} label="Pending" value="34" tone="warning" />
        <Stat icon={TrendingUp} label="Conv. Rate" value="18%" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-border bg-card shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <h3 className="text-base font-semibold">All Inquiries</h3>
              <p className="text-[11px] text-muted-foreground">{inquiries.length} total · 7 unread</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="w-56 pl-9" placeholder="Search…" />
              </div>
              <Button variant="outline" size="sm"><Filter className="mr-2 h-3.5 w-3.5" />Filter</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  {["Contact", "Property", "Channel", "Status", "Agent"].map((h) => <th key={h} className="px-4 py-2.5 text-left font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((i) => {
                  const p = propertyById(i.propertyId);
                  return (
                    <tr key={i.id} onClick={() => setActiveId(i.id)} className={`cursor-pointer border-b border-border last:border-0 ${i.id === activeId ? "bg-brand-soft/40" : "hover:bg-muted/40"}`}>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          {i.status === "New" && <span className="h-2 w-2 rounded-full bg-primary" />}
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-[10px] font-semibold text-primary">{i.contact.split(" ").map((n) => n[0]).join("")}</div>
                          <div>
                            <p className="text-sm font-medium">{i.contact}</p>
                            <p className="text-[10px] text-muted-foreground">{i.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        {p && (
                          <div className="flex items-center gap-2">
                            <img src={p.image} alt="" className="h-7 w-9 rounded object-cover" />
                            <div>
                              <p className="text-[11px] font-medium">{p.title}</p>
                              <p className="text-[10px] text-primary">{fmtUSD(p.price)}</p>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2.5"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${channelBadge(i.channel)}`}>{channelIcon(i.channel)} {i.channel}</span></td>
                      <td className="px-4 py-2.5"><StatusDot status={i.status} /></td>
                      <td className="px-4 py-2.5 text-[11px]">{i.agent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold">Detail</h3>
            <div className="flex gap-1">
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">{active.status}</span>
              <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-semibold text-destructive-foreground">{active.priority}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-primary">{active.contact.split(" ").map((n) => n[0]).join("")}</div>
            <div>
              <p className="text-sm font-semibold">{active.contact}</p>
              <p className="text-[11px] text-muted-foreground">{active.email}</p>
            </div>
          </div>
          {prop && (
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <img src={prop.image} alt={prop.title} className="aspect-[16/9] w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-semibold">{prop.title}</p>
                <p className="text-[11px] text-muted-foreground">{prop.location}</p>
                <p className="mt-1 text-sm font-semibold text-primary">{fmtUSD(prop.price)}</p>
              </div>
            </div>
          )}
          <div className="mt-3 rounded-lg bg-surface-muted p-3 text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Message</p>
            <p className="mt-1.5 text-xs leading-relaxed">"{active.message}"</p>
          </div>
          <div className="mt-4 space-y-2">
            <Button className="w-full" size="sm"><Mail className="mr-2 h-3.5 w-3.5" />Reply by Email</Button>
            <Button variant="outline" className="w-full" size="sm"><MessageCircle className="mr-2 h-3.5 w-3.5" />WhatsApp</Button>
            <Button variant="outline" className="w-full" size="sm"><Bell className="mr-2 h-3.5 w-3.5" />Book Viewing</Button>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Inbox; label: string; value: string; tone?: "success" | "warning" | "destructive" }) {
  const toneMap = { success: "text-success bg-success/10", warning: "text-warning-foreground bg-warning/15", destructive: "text-destructive bg-destructive/10" };
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${tone ? toneMap[tone] : "bg-brand-soft text-primary"}`}><Icon className="h-3.5 w-3.5" /></span>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-display">{value}</p>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const cls =
    status === "New" ? "bg-primary/15 text-primary" :
    status === "Pending" ? "bg-warning/20 text-warning-foreground" :
    status === "Replied" ? "bg-success/15 text-success" :
    "bg-muted text-muted-foreground";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>● {status}</span>;
}

function channelIcon(c: string): ReactNode {
  if (c === "WhatsApp") return <MessageCircle className="h-3 w-3" />;
  if (c === "Email") return <Mail className="h-3 w-3" />;
  return <Globe className="h-3 w-3" />;
}
