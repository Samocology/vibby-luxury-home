import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { fmtUSDFull, propertyById, properties } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { Bath, BedDouble, Calendar, Heart, MapPin, Maximize2, Phone, Share2, Mail, CheckCircle2, Car, Wifi, Trees, Waves, Dumbbell, Tv, ChefHat, Shield, ChevronRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { toast } from "sonner";

const amenities = [
  { icon: Waves, label: "Infinity Pool" }, { icon: Tv, label: "Home Theater" },
  { icon: Wifi, label: "Smart Home" }, { icon: ChefHat, label: "Chef's Kitchen" },
  { icon: Dumbbell, label: "Private Gym" }, { icon: Car, label: "3-Car Garage" },
  { icon: Trees, label: "Private Gardens" }, { icon: Shield, label: "24/7 Security" },
];

export default function PropertyDetail() {
  const { id = "" } = useParams();
  const p = propertyById(id);
  useDocumentTitle(p ? `${p.title} — LuxeEstate` : "Property — LuxeEstate", p?.description);

  const gallery = useMemo(() => {
    if (!p) return [];
    const others = properties.filter((x) => x.id !== p.id).slice(0, 4).map((x) => x.image);
    return [p.image, ...others];
  }, [p]);
  const [activeImage, setActiveImage] = useState(0);

  if (!p) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container-page py-20 text-center">
          <h1 className="text-3xl font-display">Property not found</h1>
          <Button asChild className="mt-4"><Link to="/properties">Back to listings</Link></Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const similar = properties.filter((x) => x.id !== p.id && (x.type === p.type || x.location.split(",")[1] === p.location.split(",")[1])).slice(0, 3);
  const fallback = properties.filter((x) => x.id !== p.id && !similar.includes(x)).slice(0, 3 - similar.length);
  const moreLike = [...similar, ...fallback].slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-6">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/properties" className="hover:text-foreground">Properties</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{p.title}</span>
        </nav>

        {/* Gallery */}
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_220px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
            <img src={gallery[activeImage]} alt={p.title} className="h-full w-full object-cover" />
            <Badge className="absolute left-3 top-3 gradient-brand text-primary-foreground">{p.type}</Badge>
            <div className="absolute right-3 top-3 flex gap-1.5">
              <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90"><Heart className="h-3.5 w-3.5" /></Button>
              <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90"><Share2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 lg:grid-cols-1">
            {gallery.slice(0, 4).map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${activeImage === i ? "border-primary" : "border-transparent opacity-80 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-display md:text-4xl">{p.title}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {p.location}
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gradient-brand md:text-3xl">{fmtUSDFull(p.price)}</p>
                <p className="text-right text-xs text-muted-foreground">${Math.round(p.price / p.sqft).toLocaleString()}/sqft</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                [BedDouble, `${p.beds}`, "Bedrooms"],
                [Bath, `${p.baths}`, "Bathrooms"],
                [Maximize2, p.sqft.toLocaleString(), "Square Feet"],
                [Calendar, p.listed.split(",")[0], "Listed"],
              ].map(([Icon, v, l], i) => {
                const I = Icon as typeof BedDouble;
                return (
                  <div key={i} className="rounded-lg border border-border bg-card p-3 shadow-soft">
                    <I className="h-4 w-4 text-primary" />
                    <p className="mt-1.5 text-base font-semibold">{v as string}</p>
                    <p className="text-[11px] text-muted-foreground">{l as string}</p>
                  </div>
                );
              })}
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-display md:text-2xl">About this property</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-display md:text-2xl">Features & Amenities</h2>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
                {amenities.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs">
                    <Icon className="h-4 w-4 text-primary" /> {label}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rounded-xl border border-border bg-card p-5 shadow-soft">
              <h2 className="text-xl font-display">Location</h2>
              <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>
              <div className="mt-3 aspect-[16/7] overflow-hidden rounded-lg bg-gradient-to-br from-brand-soft to-muted">
                <div className="grid h-full place-items-center text-xs text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="mx-auto h-6 w-6 text-primary" />
                    <p className="mt-2">Map preview · {p.location}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground">
                  {p.agent.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{p.agent}</p>
                  <p className="text-[11px] text-muted-foreground">Listing Agent · ★ 4.9</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full" size="sm"><Calendar className="mr-2 h-4 w-4" /> Schedule a tour</Button>
                <Button variant="outline" className="w-full" size="sm"><Phone className="mr-2 h-4 w-4" /> +1 (310) 555-0188</Button>
              </div>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("Inquiry sent — agent will respond shortly."); (e.target as HTMLFormElement).reset(); }}
              className="rounded-xl border border-border bg-card p-5 shadow-soft"
            >
              <h3 className="text-sm font-semibold">Request more info</h3>
              <div className="mt-3 space-y-2">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Email" required />
                <Input placeholder="Phone" />
                <Textarea rows={3} placeholder={`I'm interested in ${p.title}…`} />
                <Button type="submit" className="w-full" size="sm"><Mail className="mr-2 h-4 w-4" /> Send Inquiry</Button>
              </div>
            </form>

            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="text-sm font-semibold">Mortgage estimate</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">30-yr fixed · 6.5% · 20% down</p>
              <p className="mt-2 text-2xl font-display text-gradient-brand">
                ${Math.round((p.price * 0.8 * 0.0063)).toLocaleString()}
                <span className="ml-1 font-sans text-xs text-muted-foreground">/mo</span>
              </p>
              <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex justify-between"><span>Down payment</span><span>${(p.price * 0.2).toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Loan amount</span><span>${(p.price * 0.8).toLocaleString()}</span></div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-brand-soft p-4 text-xs">
              <p className="flex items-center gap-2 font-semibold text-primary"><CheckCircle2 className="h-4 w-4" /> Verified Listing</p>
              <p className="mt-1 text-muted-foreground">All info verified by our team within 24 hours.</p>
            </div>
          </aside>
        </div>

        {/* More like this */}
        <section className="mt-14 border-t border-border pt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">More like this</p>
              <h2 className="mt-1.5 text-2xl font-display md:text-3xl">Similar <span className="text-gradient-brand">Properties</span></h2>
            </div>
            <Link to="/properties" className="text-sm font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {moreLike.map((x) => <PropertyCard key={x.id} property={x} />)}
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
