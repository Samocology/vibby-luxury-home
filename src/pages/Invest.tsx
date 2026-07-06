import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { investOpportunities, fmtUSD } from "@/lib/data";
import { Building2, Shield, TrendingUp, Globe2, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function Invest() {
  useDocumentTitle("Invest in Luxury Real Estate — LuxeEstate");
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-sidebar text-sidebar-foreground">
        <div className="container-page grid gap-8 py-14 md:grid-cols-2">
          <div>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium">Real Estate Investing</span>
            <h1 className="mt-3 text-4xl font-display md:text-5xl">Build Wealth Through <span className="text-gradient-brand">Luxury Real Estate</span></h1>
            <p className="mt-3 max-w-lg text-sm text-white/80">Access institutional-grade property investments with returns averaging 12–18% annually. Start from $50,000.</p>
            <div className="mt-5 flex gap-2">
              <Button size="lg">Explore Opportunities <ArrowRight className="ml-1 h-4 w-4" /></Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">Watch Overview</Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["$2.4B+", "AUM"], ["14.7%", "Avg Return"], ["3,800+", "Investors"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-semibold">{v}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/60">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">98.2% On-time Distributions</h3>
            <p className="mt-1.5 text-xs text-white/70">Five years of consistent quarterly payouts across our portfolio.</p>
            <div className="mt-5 space-y-2.5">
              {["SEC Compliant Vehicles", "Quarterly Distributions", "Independent Audits", "Transparent Reporting"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-success" /> {f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Why LuxeEstate</p>
            <h2 className="mt-1.5 text-3xl font-display md:text-4xl">The Smart Way to <span className="text-gradient-brand">Invest</span></h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              [Building2, "Institutional Quality", "Direct access to multi-million dollar properties."],
              [Shield, "Asset-Backed Security", "Backed by physical real estate at all times."],
              [TrendingUp, "Consistent Returns", "Diversified strategy delivers 12–18% annual returns."],
              [Globe2, "Global Diversification", "Prime locations across US, Europe, Middle East, Asia."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Building2;
              return (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-primary"><I className="h-4 w-4" /></span>
                  <h3 className="mt-3 text-sm font-semibold">{t as string}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-14">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Live Opportunities</p>
              <h2 className="mt-1.5 text-3xl font-display">Current <span className="text-gradient-brand">Opportunities</span></h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {investOpportunities.map((o) => (
              <div key={o.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                <div className="flex items-center justify-between bg-sidebar px-5 py-3 text-white">
                  <div>
                    <p className="text-[10px] uppercase text-white/60">{o.category}</p>
                    <h3 className="mt-0.5 text-sm font-semibold">{o.name}</h3>
                  </div>
                  <p className="rounded-full bg-success/20 px-2.5 py-0.5 text-[11px] font-semibold text-success">{o.yield}</p>
                </div>
                <div className="space-y-3 p-5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <Stat label="Target" value={fmtUSD(o.target)} />
                    <Stat label="Term" value={o.term} />
                    <Stat label="Risk" value={o.risk} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-muted-foreground"><span>Funded</span><span>{Math.round((o.raised / o.target) * 100)}%</span></div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full gradient-brand" style={{ width: `${(o.raised / o.target) * 100}%` }} /></div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Details</Button>
                    <Button size="sm" className="flex-1">Invest</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14">
        <div className="container-page">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">How it works</p>
            <h2 className="mt-1.5 text-3xl font-display md:text-4xl">Start investing in <span className="text-gradient-brand">4 simple steps</span></h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ["01", "Create your account", "Sign up and complete a short investor questionnaire in under 5 minutes."],
              ["02", "Get verified", "KYC & accreditation handled by our compliance partners."],
              ["03", "Choose your deals", "Browse curated opportunities and commit from as little as $50,000."],
              ["04", "Earn distributions", "Track performance and receive quarterly payouts."],
            ].map(([n, t, d]) => (
              <div key={n} className="relative rounded-xl border border-border bg-card p-5 shadow-soft">
                <p className="text-3xl font-display text-gradient-brand">{n}</p>
                <h3 className="mt-2 text-sm font-semibold">{t}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor testimonials */}
      <section className="bg-surface-muted py-14">
        <div className="container-page">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Investor voices</p>
            <h2 className="mt-1.5 text-3xl font-display md:text-4xl">Trusted by <span className="text-gradient-brand">serious capital</span></h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { name: "Henri Dubois", role: "Family Office · Paris", quote: "Consistent double-digit returns and best-in-class reporting. LuxeEstate is now our default real-estate partner." },
              { name: "Priya Anand", role: "Angel Investor · Singapore", quote: "The diligence packs are exhaustive. I've never had a smoother onboarding into private RE." },
              { name: "Marc Vollmer", role: "Fund Manager · Zurich", quote: "Transparent structuring and reliable distributions across five consecutive quarters." },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container-page">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
            <h2 className="mt-1.5 text-3xl font-display md:text-4xl">Common investor questions</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-2">
            {[
              ["What's the minimum investment?", "Most deals open at $50,000. Select institutional-only offerings start higher."],
              ["Am I eligible?", "US investors must be accredited. Non-US investors are welcome subject to KYC."],
              ["How are returns paid?", "Quarterly cash distributions via ACH or wire, with a final capital-event payout at exit."],
              ["What are the fees?", "1.5% AUM and a 15% performance fee above an 8% preferred return."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <p className="text-sm font-semibold">{q}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-14">
        <div className="container-page rounded-2xl bg-sidebar p-8 text-white md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-display md:text-4xl">Ready to Build Your <span className="text-gradient-brand">Real Estate Empire?</span></h2>
              <p className="mt-2 text-sm text-white/75">Join 3,800+ investors growing their wealth.</p>
              <div className="mt-3 flex items-center gap-3 text-[11px]">
                {[[Star, "SEC Registered"], [Shield, "Bank-Level Security"], [CheckCircle2, "$2.4B+ Managed"]].map(([Icon, l], i) => {
                  const I = Icon as typeof Star;
                  return (
                    <span key={i} className="flex items-center gap-1 text-white/70"><I className="h-3.5 w-3.5" /> {l as string}</span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 sm:flex-row">
              <Input placeholder="Enter your email" className="flex-1 bg-white text-foreground placeholder:text-muted-foreground" />
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xs font-semibold">{value}</p>
    </div>
  );
}
