import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

export function AddPropertyForm({
  onDone,
  compact = false,
}: {
  onDone?: () => void;
  compact?: boolean;
}) {
  const nav = useNavigate();
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newUrls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews((p) => [...p, ...newUrls]);
  };

  return (
    <form
      className={compact ? "space-y-5" : "grid gap-5 lg:grid-cols-[1fr_300px]"}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        if (!data.get("title") || !data.get("location")) {
          toast.error("Please fill in the required fields");
          return;
        }
        toast.success("Property created successfully");
        if (onDone) onDone();
        else nav("/admin/properties");
      }}
    >
      <div className="space-y-5">
        <Section title="Basic Information">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Title" required><Input name="title" placeholder="Sunset Ridge Villa" required /></Field>
            <Field label="Type" required>
              <Select defaultValue="Villa" name="type"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                {["Villa", "Penthouse", "Apartment", "Estate", "Chalet", "Condo"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent></Select>
            </Field>
            <Field label="Price (USD)" required><Input type="number" name="price" placeholder="4200000" required /></Field>
            <Field label="Status">
              <Select defaultValue="Active" name="status"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                {["Active", "Pending", "Sold", "Inactive"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent></Select>
            </Field>
            <Field label="Location" required><Input name="location" placeholder="Beverly Hills, CA" required /></Field>
            <Field label="Listing Agent">
              <Select defaultValue="Emma Clark" name="agent"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                {["Emma Clark", "David Russo", "Amir Hassan", "Carlos Vega", "Daniel Lee"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent></Select>
            </Field>
          </div>
        </Section>

        <Section title="Details">
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Bedrooms"><Input type="number" name="beds" defaultValue={5} /></Field>
            <Field label="Bathrooms"><Input type="number" name="baths" defaultValue={4} /></Field>
            <Field label="Area (sqft)"><Input type="number" name="sqft" defaultValue={6400} /></Field>
          </div>
          <Field label="Description"><Textarea name="description" rows={4} placeholder="Write a compelling description of the property…" /></Field>
        </Section>

        <Section title="Media">
          <label className="block">
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            <div className="grid h-32 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-border bg-surface-muted text-sm text-muted-foreground transition hover:border-primary hover:bg-brand-soft/30">
              <div className="text-center">
                <Upload className="mx-auto h-5 w-5" />
                <p className="mt-1.5 text-xs">Click to upload or drag images here</p>
              </div>
            </div>
          </label>
          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-5">
              {previews.map((src, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPreviews((p) => p.filter((_, idx) => idx !== i))}
                    className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-foreground/70 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="SEO">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Slug"><Input placeholder="sunset-ridge-villa" /></Field>
            <Field label="Meta Description"><Input placeholder="Short SEO description" /></Field>
          </div>
        </Section>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button type="submit" size="sm">Publish Property</Button>
          <Button type="button" variant="outline" size="sm" onClick={() => toast.success("Saved as draft")}>Save Draft</Button>
          {onDone && <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancel</Button>}
        </div>
      </div>

      {!compact && (
        <aside className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Publish</h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Save as draft or publish immediately to the public site.</p>
            <p className="mt-3 text-xs text-muted-foreground">Use the buttons at the bottom of the form.</p>
          </div>
        </aside>
      )}
    </form>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <Label className="text-[11px]">{label}{required && <span className="text-destructive"> *</span>}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
