import { NavLink } from "react-router-dom";
import { Home, Building2, TrendingUp, Mail, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/properties", label: "Browse", icon: Building2 },
  { to: "/invest", label: "Invest", icon: TrendingUp },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/auth", label: "Account", icon: User },
];

export function MobileBottomNav() {
  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <ul className="grid grid-cols-5">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  end={it.end}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium transition ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-xl transition ${
                          isActive ? "gradient-brand text-primary-foreground shadow-brand" : ""
                        }`}
                      >
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
      {/* Spacer so content isn't hidden behind the fixed nav */}
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
