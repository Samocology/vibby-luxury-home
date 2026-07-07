import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export function SiteFooter() {
  return (
    <>
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-page grid gap-8 py-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md gradient-brand text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold">Vibby Luxury Home</span>
          </Link>
          <p className="mt-3 max-w-sm text-xs text-muted-foreground">
            The world's most trusted platform for luxury real estate discovery, investment, and portfolio management.
          </p>
        </div>
        {[
          { title: "Properties", links: [["Luxury Villas", "/properties"], ["Penthouses", "/properties"], ["Estates", "/properties"]] },
          { title: "Services", links: [["Property Search", "/properties"], ["Investment Advisory", "/invest"], ["Concierge", "/contact"]] },
          { title: "Company", links: [["About", "/contact"], ["Contact", "/contact"], ["List Property", "/admin"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider">{col.title}</h4>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="hover:text-foreground">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vibby Luxury Home. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/contact">Privacy</Link>
            <Link to="/contact">Terms</Link>
            <Link to="/contact">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
    <MobileBottomNav />
    </>
  );
}

