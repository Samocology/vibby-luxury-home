import { Badge } from "@/components/ui/badge";

export function StatusPill({ status }: { status: "Active" | "Pending" | "Sold" }) {
  const cls =
    status === "Active"
      ? "bg-success/15 text-success"
      : status === "Pending"
      ? "bg-warning/20 text-warning-foreground"
      : "bg-primary/15 text-primary";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>{status}</span>;
}

export function channelBadge(c: "Website" | "WhatsApp" | "Email") {
  return c === "WhatsApp"
    ? "bg-success/15 text-success"
    : c === "Email"
    ? "bg-primary/15 text-primary"
    : "bg-muted text-foreground";
}

export { Badge };
