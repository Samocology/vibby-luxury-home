import { useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Copy, Pencil, Trash2, Send } from "lucide-react";
import { campaigns as seed } from "@/lib/data";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { toast } from "sonner";

type Campaign = (typeof seed)[number];

export default function Campaigns() {
  useDocumentTitle("Email Campaigns — LuxeEstate Admin");
  const [rows, setRows] = useState<Campaign[]>(seed);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Campaign | null>(null);

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (c: Campaign) => { setEditing(c); setOpen(true); };

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const audience = String(f.get("audience") || "All Subscribers");
    if (!name) { toast.error("Campaign name is required"); return; }
    if (editing) {
      setRows((r) => r.map((x) => x.id === editing.id ? { ...x, name, audience } : x));
      toast.success("Campaign updated");
    } else {
      const id = `c${Date.now()}`;
      setRows((r) => [{ id, name, audience, sent: 0, opens: "—", clicks: "—", status: "Draft", date: "—" }, ...r]);
      toast.success("Campaign created");
    }
    setOpen(false);
  };

  const duplicate = (c: Campaign) => {
    setRows((r) => [{ ...c, id: `c${Date.now()}`, name: `${c.name} (Copy)`, status: "Draft", sent: 0, opens: "—", clicks: "—", date: "—" }, ...r]);
    toast.success("Campaign duplicated");
  };
  const send = (c: Campaign) => {
    setRows((r) => r.map((x) => x.id === c.id ? { ...x, status: "Sent", sent: 1000, opens: "42.0%", clicks: "11.4%", date: new Date().toLocaleDateString() } : x));
    toast.success(`Sent "${c.name}"`);
  };
  const remove = (c: Campaign) => {
    setRows((r) => r.filter((x) => x.id !== c.id));
    toast.success("Campaign deleted");
  };

  return (
    <AdminShell
      title="Email Campaigns"
      breadcrumb="Admin · Engagement · Campaigns"
      actions={<Button size="sm" onClick={openNew}><Plus className="mr-2 h-3.5 w-3.5" />New Campaign</Button>}
    >
      <div className="rounded-xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>{["Campaign", "Audience", "Sent", "Opens", "Clicks", "Status", "Date", ""].map((h) => <th key={h} className="px-4 py-2.5 text-left font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-2.5 text-sm font-medium">{c.name}</td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground">{c.audience}</td>
                  <td className="px-4 py-2.5 text-sm">{c.sent.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-sm">{c.opens}</td>
                  <td className="px-4 py-2.5 text-sm">{c.clicks}</td>
                  <td className="px-4 py-2.5">
                    <Badge className={c.status === "Sent" ? "bg-success/15 text-success" : c.status === "Active" ? "bg-primary/15 text-primary" : "bg-muted text-foreground"}>{c.status}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-muted-foreground">{c.date}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex justify-end gap-0.5">
                      {c.status !== "Sent" && (
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Send now" onClick={() => send(c)}>
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit" onClick={() => openEdit(c)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Duplicate" onClick={() => duplicate(c)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" title="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete campaign?</AlertDialogTitle>
                            <AlertDialogDescription>"{c.name}" will be permanently removed.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => remove(c)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">No campaigns yet. Create your first one!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit campaign" : "New campaign"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update the campaign details below." : "Set up a new email campaign for your audience."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="space-y-3">
            <div>
              <Label htmlFor="cname">Campaign name</Label>
              <Input id="cname" name="name" defaultValue={editing?.name ?? ""} placeholder="August New Listings" required className="mt-1" />
            </div>
            <div>
              <Label>Audience</Label>
              <Select name="audience" defaultValue={editing?.audience ?? "All Subscribers"}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["All Subscribers", "Investors", "CA Buyers", "New Signups", "Past Clients"].map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cmsg">Message preview (optional)</Label>
              <Textarea id="cmsg" rows={3} className="mt-1" placeholder="Discover this month's most exclusive new listings…" />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">{editing ? "Save changes" : "Create campaign"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
