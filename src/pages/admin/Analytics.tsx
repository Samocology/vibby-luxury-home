import { AdminShell } from "@/components/admin-shell";
import { TrendingUp, Users, Building2, DollarSign } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Analytics() {
  useDocumentTitle("Analytics — Vibby Luxury Home Admin");
  const traffic = [42, 58, 51, 69, 78, 84, 92, 88, 95, 110, 118, 132];
  const max = Math.max(...traffic);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <AdminShell title="Analytics" breadcrumb="Admin · Overview · Analytics">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          [DollarSign, "Revenue YTD", "$8.41M", "+18.2%"],
          [Users, "Site Visitors", "248K", "+11.4%"],
          [Building2, "Listing Views", "1.2M", "+24.1%"],
          [TrendingUp, "Inquiry Conv.", "18.0%", "+2.6%"],
        ].map(([Icon, l, v, d], i) => {
          const I = Icon as typeof DollarSign;
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-primary"><I className="h-3.5 w-3.5" /></span>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{l as string}</p>
              </div>
              <p className="mt-2 text-2xl font-display">{v as string}</p>
              <p className="mt-0.5 text-[11px] text-success">↗ {d as string} vs prior period</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-base font-semibold">Traffic Overview</h3>
          <p className="text-[11px] text-muted-foreground">Monthly site visitors</p>
          <div className="mt-5 flex h-56 items-end gap-1.5">
            {traffic.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="w-full rounded-t-md gradient-brand" style={{ height: `${(v / max) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-base font-semibold">Top Sources</h3>
          <ul className="mt-4 space-y-3">
            {[["Direct", 42], ["Organic Search", 28], ["Referral", 16], ["Email", 9], ["Social", 5]].map(([n, pct]) => (
              <li key={n as string}>
                <div className="flex justify-between text-xs"><span>{n}</span><span className="text-muted-foreground">{pct}%</span></div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full gradient-brand" style={{ width: `${pct}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
