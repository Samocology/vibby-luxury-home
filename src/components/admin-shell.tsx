import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, BarChart3, Building2, Inbox, Mail, Settings,
  Bell, MessageSquare, ChevronRight, LogOut, Menu, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean; badge?: string };
const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Properties",
    items: [
      { to: "/admin/properties", label: "Properties", icon: Building2, badge: "142" },
    ],
  },
  {
    title: "Engagement",
    items: [
      { to: "/admin/inquiries", label: "Inquiries", icon: Inbox, badge: "7" },
      { to: "/admin/campaigns", label: "Email Campaigns", icon: Mail },
    ],
  },
  {
    title: "System",
    items: [{ to: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link
        to="/admin"
        onClick={onNavigate}
        className="flex items-center gap-2 border-b border-sidebar-border/60 px-5 py-4"
      >
        <span className="grid h-8 w-8 place-items-center rounded-md gradient-brand text-primary-foreground">
          <Building2 className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold">LuxeEstate</span>
        <span className="ml-auto rounded bg-sidebar-accent px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">Admin</span>
      </Link>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">{g.title}</p>
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const Icon = it.icon;
                return (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-brand"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate">{it.label}</span>
                        {it.badge && (
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${isActive ? "bg-sidebar/40" : "bg-sidebar-accent text-sidebar-foreground"}`}>
                            {it.badge}
                          </span>
                        )}
                        {isActive && <ChevronRight className="h-3 w-3 opacity-70" />}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border/60 p-3">
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/40 p-2">
          <div className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-[11px] font-semibold text-primary-foreground">JM</div>
          <div className="flex-1 min-w-0 text-xs">
            <p className="truncate font-medium">James Morrison</p>
            <p className="truncate text-[10px] text-sidebar-foreground/55">Super Admin</p>
          </div>
          <Link to="/" title="Back to site" className="rounded p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}

const bottomNav = [
  { to: "/admin", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/admin/properties", label: "Listings", icon: Building2 },
  { to: "/admin/inquiries", label: "Inbox", icon: Inbox },
  { to: "/admin/analytics", label: "Insights", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  title,
  breadcrumb,
  actions,
  children,
}: {
  title: string;
  breadcrumb: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <SidebarInner />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:px-7">
          <div className="flex min-w-0 items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-r border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
                <div className="flex h-full flex-col">
                  <SidebarInner onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">{title}</h1>
              <p className="truncate text-[11px] text-muted-foreground">{breadcrumb}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button variant="outline" size="icon" className="hidden h-8 w-8 sm:inline-flex" onClick={() => nav("/")} title="Back to site">
              <Home className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="hidden h-8 w-8 sm:inline-flex"><Bell className="h-3.5 w-3.5" /></Button>
            <Button variant="outline" size="icon" className="hidden h-8 w-8 sm:inline-flex"><MessageSquare className="h-3.5 w-3.5" /></Button>
            {actions}
          </div>
        </header>
        <div className="flex-1 px-4 py-5 pb-24 sm:px-5 lg:px-7 lg:pb-8">{children}</div>
      </main>

      {/* Mobile bottom nav for admin */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <ul className="grid grid-cols-5">
          {bottomNav.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  end={it.end}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`grid h-8 w-8 place-items-center rounded-xl ${isActive ? "gradient-brand text-primary-foreground shadow-brand" : ""}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{it.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
