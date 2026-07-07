import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, ArrowRight, Star, TrendingUp, Quote, PlayCircle, Building2 } from "lucide-react";
import { properties, investOpportunities, fmtUSD } from "@/lib/data";
import { useDocumentTitle } from "@/hooks/use-document-title";
import hero from "@/assets/hero-mansion.jpg";
import type { ReactNode } from "react";

export default function Home() {
  useDocumentTitle("Vibby Luxury Home — Find Your Luxury Dream Home", "Discover world-class luxury properties from $1M to $100M+.");
  const handpicked = properties.filter((p) => p.featured).slice(0, 3);
  const recent = properties.slice(0, 4);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader transparent />

      <section className="relative isolate overflow-hidden text-white">
        <img src={hero} alt="Luxury hillside mansion at twilight" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/40" />
        <div className="container-page flex flex-col gap-6 pb-8 pt-20 md:pt-24">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium backdrop-blur">
              <Star className="h-3 w-3" /> Premium Luxury Real Estate
            </span>
            <h1 className="text-3xl font-display leading-[1.1] md:text-4xl lg:text-5xl">
              Find Your <span className="text-gradient-brand">Dream Home</span> Today
            </h1>
            <p className="max-w-xl text-sm text-white/85">
              Discover world-class luxury properties and full-service buying, investing, and brokerage — beautifully.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="shadow-brand">
                <Link to="/properties">Explore Properties <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button size="sm" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                 <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
            <dl className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
              {[["2,800+", "Properties"], ["1,400+", "Clients"], ["$4.2B", "Volume"], ["98%", "Satisfaction"]].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-lg font-semibold md:text-xl">{v}</dt>
                  <dd className="mt-0.5 text-[10px] uppercase tracking-wider text-white/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-white/10 bg-background/95 p-3 text-foreground shadow-elevated backdrop-blur">
            <Tabs defaultValue="buy">
              <TabsList>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="invest">Invest</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-5">
              <div className="md:col-span-2">
                <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Beverly Hills, CA" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Price</label>
                <Select defaultValue="3-15">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">$1M – $3M</SelectItem>
                    <SelectItem value="3-15">$3M – $15M</SelectItem>
                    <SelectItem value="15-50">$15M – $50M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Beds</label>
                <Select defaultValue="3">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button asChild className="w-full">
                  <Link to="/properties"><Search className="mr-2 h-4 w-4" /> Search</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Featured" title={<>Handpicked <span className="text-gradient-brand">Luxury Properties</span></>} action={<Link to="/properties" className="text-sm font-medium text-primary hover:underline">View All →</Link>}>
        <div className="grid gap-5 md:grid-cols-3">
          {handpicked.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </Section>

      <Section eyebrow="Latest" title={<>Recently <span className="text-gradient-brand">Listed</span></>} action={<Link to="/properties" className="text-sm font-medium text-primary hover:underline">View All →</Link>}>
        <div className="grid gap-4 md:grid-cols-2">
          {recent.map((p) => (
            <Link key={p.id} to={`/properties/${p.id}`} className="group flex gap-3 overflow-hidden rounded-xl bg-card p-3 shadow-soft transition hover:shadow-elevated">
              <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="min-w-0 flex-1 py-0.5">
                <p className="text-base font-semibold">{fmtUSD(p.price)}</p>
                <p className="truncate text-sm font-medium">{p.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {p.location}</p>
                <div className="mt-1 flex gap-3 text-[11px] text-muted-foreground">
                  <span>{p.beds} bd</span><span>{p.baths} ba</span><span>{p.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <section className="bg-surface-muted py-14">
        <div className="container-page">
          <Heading eyebrow="Investment" title={<>High-Yield <span className="text-gradient-brand">Opportunities</span></>} action={<Link to="/invest" className="text-sm font-medium text-primary hover:underline">All Opportunities →</Link>}>
            Distinctively sourced investment properties with proven returns and long-term appreciation potential.
          </Heading>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {investOpportunities.map((o) => (
              <div key={o.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-medium text-primary">{o.category}</span>
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <p className="mt-4 text-3xl font-display text-gradient-brand">{o.yield}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Projected Annual Yield</p>
                <h3 className="mt-3 text-base font-semibold">{o.name}</h3>
                <p className="text-xs text-muted-foreground">{o.location}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] text-muted-foreground"><span>Raised</span><span>{fmtUSD(o.raised)} / {fmtUSD(o.target)}</span></div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full gradient-brand" style={{ width: `${(o.raised / o.target) * 100}%` }} />
                  </div>
                </div>
                <Button asChild className="mt-5 w-full"><Link to="/invest">Invest Now</Link></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Testimonials" title={<>What Our <span className="text-gradient-brand">Clients Say</span></>}>
        <div className="grid gap-5 md:grid-cols-3">
          {[
             { name: "Michael Thompson", role: "CEO, Tech Founder", quote: "Vibby Luxury Home's team made our dream home purchase seamless. Their agents are incredibly knowledgeable." },
            { name: "Layla Al-Rashid", role: "Investor", quote: "As an international investor, I needed a platform I could trust. The team delivered exceptional ROI from day one." },
            { name: "Sophie Bauwens", role: "Family Office", quote: "Their concierge service is world-class. We've expanded our portfolio across three continents." },
          ].map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <Quote className="h-5 w-5 text-primary/30" />
              <p className="mt-2 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                <div className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-sm font-semibold text-primary-foreground">{t.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative isolate overflow-hidden gradient-brand py-14 text-primary-foreground">
        <div className="container-page grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-display md:text-4xl">Ready to find your next home?</h2>
            <p className="mt-2 max-w-md text-sm text-white/85">Talk with a senior advisor and get a curated shortlist within 48 hours.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" variant="secondary"><Link to="/contact">Book a consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/15 hover:text-white">
              <Link to="/properties"><Building2 className="mr-2 h-4 w-4" /> Browse listings</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Section({ eyebrow, title, action, children }: { eyebrow: string; title: ReactNode; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="py-14">
      <div className="container-page">
        <Heading eyebrow={eyebrow} title={title} action={action} />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Heading({ eyebrow, title, action, children }: { eyebrow: string; title: ReactNode; action?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h2 className="mt-1.5 text-3xl font-display md:text-4xl">{title}</h2>
        {children && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{children}</p>}
      </div>
      {action}
    </div>
  );
}
