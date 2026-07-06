import { Link, NavLink } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/properties", label: "Properties" },
  { to: "/invest", label: "Invest" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        transparent
          ? `absolute inset-x-0 top-0 z-30 transition-all duration-300 ${
              scrolled
                ? "bg-background/90 backdrop-blur-lg border-b border-border/50 text-foreground shadow-sm"
                : "bg-transparent text-white"
            }`
          : "sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-lg"
      }
    >
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Building2 className="h-4.5 w-4.5" />
          </span>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight leading-none">LuxeEstate</span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70 leading-none mt-0.5">
              Premium Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : transparent && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background hover:bg-muted transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-lg md:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="container-page py-4 space-y-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                    <span className={isActive ? "" : "ml-[14px]"}>{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            
            {/* Mobile contact info */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="px-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Need assistance?</p>
                <a 
                  href="tel:+13105550188" 
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  +1 (310) 555-0188
                </a>
                <p className="text-xs text-muted-foreground">Mon–Fri, 8am–8pm PT</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}