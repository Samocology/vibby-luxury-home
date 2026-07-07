import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { properties } from "@/lib/data";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { toast } from "sonner";

export default function Properties() {
  const [openFilters, setOpenFilters] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 50]);
  
  // Mobile filter states
  const [mobileSearch, setMobileSearch] = useState("");
  const [mobilePriceRange, setMobilePriceRange] = useState("3-15");
  const [mobileBedrooms, setMobileBedrooms] = useState("any");
  const [mobileSortBy, setMobileSortBy] = useState("new");
  const [mobilePropertyTypes, setMobilePropertyTypes] = useState<string[]>([]);
  const [mobileListingStatus, setMobileListingStatus] = useState<string[]>(["For Sale"]);
  const [mobileAmenities, setMobileAmenities] = useState<string[]>([]);
  const [mobileViews, setMobileViews] = useState<string[]>([]);

  // Active filters count
  const activeMobileFiltersCount = useMemo(() => {
    let count = 0;
    if (mobileSearch) count++;
    if (mobilePriceRange !== "3-15") count++;
    if (mobileBedrooms !== "any") count++;
    if (mobileSortBy !== "new") count++;
    if (mobilePropertyTypes.length > 0) count++;
    if (mobileListingStatus.length > 0 && !(mobileListingStatus.length === 1 && mobileListingStatus[0] === "For Sale")) count++;
    if (mobileAmenities.length > 0) count++;
    if (mobileViews.length > 0) count++;
    return count;
  }, [mobileSearch, mobilePriceRange, mobileBedrooms, mobileSortBy, mobilePropertyTypes, mobileListingStatus, mobileAmenities, mobileViews]);

  const resetMobileFilters = () => {
    setMobileSearch("");
    setMobilePriceRange("3-15");
    setMobileBedrooms("any");
    setMobileSortBy("new");
    setMobilePropertyTypes([]);
    setMobileListingStatus(["For Sale"]);
    setMobileAmenities([]);
    setMobileViews([]);
  };

  const applyMobileFilters = () => {
    // Here you would normally filter the properties array
    // For now, we'll simulate the filtering
    setMobileFiltersOpen(false);
    toast.success("Filters applied", {
      description: `${activeMobileFiltersCount} active filter${activeMobileFiltersCount !== 1 ? 's' : ''}`,
    });
  };

  useDocumentTitle("Browse Luxury Properties — Vibby Luxury Home");
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-8">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Properties</span>
        </nav>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Browse <span className="text-gradient-brand">Luxury Properties</span></h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Discover your perfect home from our curated collection of premium estates worldwide.</p>
          </div>
          <div className="text-xs text-muted-foreground">Showing <span className="font-semibold text-foreground">1–{properties.length}</span> of 2,847</div>
        </div>

        {/* Desktop Filters */}
        <div className="mt-5 hidden lg:flex flex-wrap gap-2 rounded-lg border border-border bg-card p-2 shadow-soft">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by city, neighborhood, ZIP…" />
          </div>
          <Select defaultValue="3-15"><SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="1-3">$1M – $3M</SelectItem>
            <SelectItem value="3-15">$3M – $15M</SelectItem>
            <SelectItem value="15-50">$15M – $50M</SelectItem>
          </SelectContent></Select>
          <Select defaultValue="3"><SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="any">Any beds</SelectItem>
            <SelectItem value="3">3+ beds</SelectItem>
            <SelectItem value="5">5+ beds</SelectItem>
          </SelectContent></Select>
          <Sheet open={openFilters} onOpenChange={setOpenFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm"><SlidersHorizontal className="mr-2 h-4 w-4" />More Filters</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Advanced filters</SheetTitle>
                <SheetDescription>Narrow your search down to the perfect property.</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Price range</p>
                    <p className="text-xs text-muted-foreground">${priceRange[0]}M – ${priceRange[1]}M</p>
                  </div>
                  <Slider
                    className="mt-4"
                    min={1}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <FilterGroup title="Property Type" options={["Villa", "Penthouse", "Apartment", "Estate", "Chalet", "Condo", "Commercial", "Land"]} />
                <FilterGroup title="Bedrooms" options={["Any", "2+", "3+", "4+", "5+", "6+"]} defaultChecked={["3+"]} inline />
                <FilterGroup title="Bathrooms" options={["Any", "2+", "3+", "4+", "5+"]} defaultChecked={["Any"]} inline />
                <FilterGroup title="Amenities" options={["Swimming Pool", "Home Theater", "Smart Home", "Ocean View", "Wine Cellar", "Gym", "Elevator", "Garage"]} />
                <FilterGroup title="Listing Status" options={["Active", "Pending", "New today", "Price reduced"]} inline defaultChecked={["Active"]} />
                <FilterGroup title="Views" options={["Ocean", "Mountain", "City", "Garden", "Lake"]} inline />
              </div>
              <SheetFooter className="mt-6 flex flex-row gap-2">
                <Button variant="ghost" className="flex-1" onClick={() => { setPriceRange([1, 50]); }}>Reset</Button>
                <Button className="flex-1" onClick={() => { setOpenFilters(false); toast.success("Filters applied"); }}>Show results</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Select defaultValue="new"><SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="new">Newest First</SelectItem>
            <SelectItem value="price-asc">Price: Low → High</SelectItem>
            <SelectItem value="price-desc">Price: High → Low</SelectItem>
          </SelectContent></Select>
        </div>

        {/* Mobile Filter Trigger */}
        <div className="mt-5 lg:hidden">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2 relative">
                <SlidersHorizontal className="h-4 w-4" />
                Filters & Search
                {activeMobileFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeMobileFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Find your perfect property</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-9" 
                    placeholder="Search by city, neighborhood…" 
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                  />
                  {mobileSearch && (
                    <button
                      onClick={() => setMobileSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {/* Price Range */}
                <div>
                  <label className="text-sm font-semibold">Price Range</label>
                  <Select value={mobilePriceRange} onValueChange={setMobilePriceRange}>
                    <SelectTrigger className="mt-2 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">$1M – $3M</SelectItem>
                      <SelectItem value="3-15">$3M – $15M</SelectItem>
                      <SelectItem value="15-50">$15M – $50M</SelectItem>
                      <SelectItem value="50+">$50M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-semibold">Bedrooms</label>
                  <Select value={mobileBedrooms} onValueChange={setMobileBedrooms}>
                    <SelectTrigger className="mt-2 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any beds</SelectItem>
                      <SelectItem value="2">2+ beds</SelectItem>
                      <SelectItem value="3">3+ beds</SelectItem>
                      <SelectItem value="5">5+ beds</SelectItem>
                      <SelectItem value="7">7+ beds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-semibold">Sort By</label>
                  <Select value={mobileSortBy} onValueChange={setMobileSortBy}>
                    <SelectTrigger className="mt-2 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Newest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low → High</SelectItem>
                      <SelectItem value="price-desc">Price: High → Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <FilterGroup 
                  title="Property Type" 
                  options={["Villa", "Penthouse", "Apartment", "Estate", "Chalet", "Condo", "Commercial", "Land"]}
                  selected={mobilePropertyTypes}
                  onToggle={(option) => {
                    setMobilePropertyTypes(prev => 
                      prev.includes(option) 
                        ? prev.filter(o => o !== option)
                        : [...prev, option]
                    );
                  }}
                />
                
                {/* Listing Status */}
                <FilterGroup 
                  title="Listing Status" 
                  options={["For Sale", "For Rent", "Pending"]} 
                  selected={mobileListingStatus}
                  onToggle={(option) => {
                    setMobileListingStatus(prev => 
                      prev.includes(option) 
                        ? prev.filter(o => o !== option)
                        : [...prev, option]
                    );
                  }}
                />
                
                {/* Amenities */}
                <FilterGroup 
                  title="Amenities" 
                  options={["Swimming Pool", "Home Theater", "Smart Home", "Ocean View", "Wine Cellar", "Gym", "Elevator", "Garage"]}
                  selected={mobileAmenities}
                  onToggle={(option) => {
                    setMobileAmenities(prev => 
                      prev.includes(option) 
                        ? prev.filter(o => o !== option)
                        : [...prev, option]
                    );
                  }}
                />
                
                {/* Views */}
                <FilterGroup 
                  title="Views" 
                  options={["Ocean", "Mountain", "City", "Garden", "Lake"]} 
                  inline 
                  selected={mobileViews}
                  onToggle={(option) => {
                    setMobileViews(prev => 
                      prev.includes(option) 
                        ? prev.filter(o => o !== option)
                        : [...prev, option]
                    );
                  }}
                />

                {/* Active Filters Preview */}
                {activeMobileFiltersCount > 0 && (
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {activeMobileFiltersCount} active filter{activeMobileFiltersCount !== 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {mobileSearch && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          Search: {mobileSearch}
                          <button onClick={() => setMobileSearch("")}><X className="h-3 w-3" /></button>
                        </span>
                      )}
                      {mobilePriceRange !== "3-15" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {mobilePriceRange}
                          <button onClick={() => setMobilePriceRange("3-15")}><X className="h-3 w-3" /></button>
                        </span>
                      )}
                      {mobilePropertyTypes.map(type => (
                        <span key={type} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {type}
                          <button onClick={() => setMobilePropertyTypes(prev => prev.filter(t => t !== type))}><X className="h-3 w-3" /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <SheetFooter className="mt-6 flex flex-row gap-2 sticky bottom-0 bg-background pt-4 border-t">
                <Button variant="ghost" className="flex-1" onClick={resetMobileFilters}>
                  Reset All
                </Button>
                <Button className="flex-1" onClick={applyMobileFilters}>
                  Show Results
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block h-fit space-y-5 rounded-xl border border-border bg-card p-4 shadow-soft">
            <FilterGroup title="Listing Status" options={["For Sale", "For Rent"]} defaultChecked={["For Sale"]} />
            <FilterGroup title="Property Type" options={["Villa", "Penthouse", "Apartment", "Estate", "Commercial", "Land"]} defaultChecked={["Villa"]} />
            <div>
              <h3 className="mb-2 text-sm font-semibold">Price Range</h3>
              <div className="flex gap-2">
                <Input placeholder="Min" defaultValue="$1M" />
                <Input placeholder="Max" defaultValue="$50M" />
              </div>
            </div>
            <FilterGroup title="Bedrooms" options={["Any", "2+", "3+", "4+", "5+"]} defaultChecked={["3+"]} inline />
            <FilterGroup title="Amenities" options={["Swimming Pool", "Home Theater", "Smart Home", "Ocean View", "Wine Cellar"]} />
            <div className="flex flex-col gap-2 pt-1">
              <Button size="sm">Apply Filters</Button>
              <Button variant="ghost" size="sm">Clear All</Button>
            </div>
          </aside>

          {/* Property Grid */}
          <div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
            <div className="mt-8 flex items-center justify-center gap-1.5">
              {["1", "2", "3", "4", "…", "236"].map((n) => (
                <Button key={n} variant={n === "1" ? "default" : "outline"} size="sm">{n}</Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function FilterGroup({ 
  title, 
  options, 
  defaultChecked = [], 
  inline,
  selected,
  onToggle 
}: { 
  title: string; 
  options: string[]; 
  defaultChecked?: string[]; 
  inline?: boolean;
  selected?: string[];
  onToggle?: (option: string) => void;
}) {
  const activeOptions = selected || defaultChecked;
  
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className={inline ? "flex flex-wrap gap-1.5" : "space-y-1.5"}>
        {options.map((opt) =>
          inline ? (
            <button 
              key={opt} 
              onClick={() => onToggle?.(opt)}
              className={`rounded-md border px-2.5 py-1 text-xs font-medium transition ${
                activeOptions.includes(opt) 
                  ? "border-primary bg-brand-soft text-primary" 
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              {opt}
            </button>
          ) : (
            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox 
                checked={activeOptions.includes(opt)}
                onCheckedChange={() => onToggle?.(opt)}
                defaultChecked={!onToggle && defaultChecked.includes(opt)}
              />
              <span>{opt}</span>
            </label>
          )
        )}
      </div>
    </div>
  );
}