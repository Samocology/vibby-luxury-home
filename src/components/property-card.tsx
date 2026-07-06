import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import { fmtUSD, type Property } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ property }: { property: Property }) {
  const badge =
    property.status === "Sold"
      ? { label: "Sold", className: "bg-destructive text-destructive-foreground" }
      : property.featured
      ? { label: "Featured", className: "gradient-brand text-primary-foreground" }
      : property.status === "Pending"
      ? { label: "Pending", className: "bg-warning text-warning-foreground" }
      : { label: "New", className: "bg-success text-success-foreground" };

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-soft transition hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <Badge className={`absolute left-3 top-3 text-[10px] ${badge.className}`}>{badge.label}</Badge>
        <div className="absolute right-3 top-3 rounded-md bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur">
          {property.type}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-lg font-semibold text-foreground">{fmtUSD(property.price)}</p>
        </div>
        <div>
          <h3 className="line-clamp-1 text-sm font-medium text-foreground">{property.title}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {property.location}
          </p>
        </div>
        <div className="flex items-center gap-3 border-t border-border pt-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" /> {property.beds} bd</span>
          <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {property.baths} ba</span>
          <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" /> {property.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </Link>
  );
}
