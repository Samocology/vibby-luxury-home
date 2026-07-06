import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";

export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "Villa" | "Penthouse" | "Apartment" | "Estate" | "Chalet" | "Condo";
  status: "Active" | "Pending" | "Sold";
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  agent: string;
  views: number;
  listed: string;
  featured?: boolean;
  description?: string;
};

export const properties: Property[] = [
  { id: "sunset-ridge", title: "Sunset Ridge Villa", location: "Beverly Hills, CA", price: 4200000, type: "Villa", status: "Active", beds: 5, baths: 4, sqft: 6400, image: p3, agent: "Emma Clark", views: 2841, listed: "Jun 12, 2025", featured: true, description: "A breathtaking Mediterranean estate perched in the Beverly Hills foothills with panoramic city views, a resort-style pool, and a private screening room." },
  { id: "chelsea-penthouse", title: "The Chelsea Penthouse", location: "Manhattan, NY", price: 7850000, type: "Penthouse", status: "Active", beds: 4, baths: 5, sqft: 4900, image: p2, agent: "David Russo", views: 5107, listed: "May 28, 2025", featured: true, description: "Floor-to-ceiling windows wrap this Chelsea trophy penthouse, framing iconic skyline views from every room." },
  { id: "burj-vista", title: "Burj Vista Apartment", location: "Downtown Dubai, UAE", price: 2100000, type: "Apartment", status: "Pending", beds: 3, baths: 3, sqft: 2800, image: p6, agent: "Amir Hassan", views: 3492, listed: "Jul 1, 2025", description: "Direct Burj Khalifa views from a sky-high residence in the heart of Downtown Dubai." },
  { id: "malibu-oceanfront", title: "Malibu Oceanfront Estate", location: "Malibu, California", price: 11500000, type: "Estate", status: "Sold", beds: 7, baths: 8, sqft: 11200, image: p1, agent: "Emma Clark", views: 9204, listed: "Apr 5, 2025", featured: true, description: "Trophy beachfront compound on a rare double lot with private cove access and over 200 feet of frontage." },
  { id: "south-beach", title: "South Beach Retreat", location: "Miami Beach, Florida", price: 3750000, type: "Villa", status: "Active", beds: 5, baths: 5, sqft: 5800, image: p5, agent: "Carlos Vega", views: 1988, listed: "Jul 9, 2025", description: "A serene white-walled villa moments from the sand, with a sun-bathed courtyard and resort-style pool." },
  { id: "aspen-chalet", title: "Aspen Mountain Chalet", location: "Aspen, Colorado", price: 6400000, type: "Chalet", status: "Active", beds: 6, baths: 6, sqft: 7200, image: p4, agent: "David Russo", views: 4311, listed: "Jun 28, 2025", description: "Ski-in/ski-out timber-and-stone chalet with cathedral ceilings and direct slope access." },
  { id: "marina-bay", title: "Marina Bay Condo", location: "Marina Bay, Singapore", price: 3200000, type: "Condo", status: "Pending", beds: 3, baths: 3, sqft: 3100, image: p6, agent: "Daniel Lee", views: 2054, listed: "Jul 15, 2025", description: "High-floor Marina Bay residence with skyline and waterfront views." },
];

export const agents = [
  { id: "emma", name: "Emma Clark", title: "Senior Listing Agent", deals: 7, revenue: 1240000, satisfaction: 98, leads: 9 },
  { id: "david", name: "David Russo", title: "Principal Broker", deals: 5, revenue: 980000, satisfaction: 95, leads: 12 },
  { id: "amir", name: "Amir Hassan", title: "International Specialist", deals: 4, revenue: 740000, satisfaction: 91, leads: 6 },
  { id: "carlos", name: "Carlos Vega", title: "Miami Lead Agent", deals: 4, revenue: 690000, satisfaction: 93, leads: 5 },
  { id: "daniel", name: "Daniel Lee", title: "APAC Director", deals: 3, revenue: 580000, satisfaction: 94, leads: 7 },
];

export type Inquiry = {
  id: string;
  contact: string;
  email: string;
  phone?: string;
  propertyId: string;
  message: string;
  channel: "Website" | "WhatsApp" | "Email";
  status: "New" | "Pending" | "Replied" | "Closed";
  agent: string;
  received: string;
  priority: "High" | "Med" | "Low";
};

export const inquiries: Inquiry[] = [
  { id: "i1", contact: "Oliver Bennett", email: "o.bennett@email.com", phone: "+44 7700 900123", propertyId: "chelsea-penthouse", message: "I'm very interested in scheduling a private viewing for The Chelsea Penthouse this week. Could you please let me know the available slots? Also, would it be possible to arrange a virtual tour beforehand?", channel: "Website", status: "New", agent: "David Russo", received: "Jul 17, 2025 · 9:42 AM", priority: "High" },
  { id: "i2", contact: "Sophie Chen", email: "sophie.chen@gmail.com", propertyId: "sunset-ridge", message: "Can you send me more details about the lot size and HOA fees?", channel: "WhatsApp", status: "New", agent: "Emma Clark", received: "Jul 17, 2025 · 8:10 AM", priority: "Med" },
  { id: "i3", contact: "Khalid Al-Rashid", email: "k.rashid@invest.ae", propertyId: "burj-vista", message: "We represent a fund interested in a portfolio acquisition.", channel: "Email", status: "Pending", agent: "Amir Hassan", received: "Jul 17, 2025 · 7:01 AM", priority: "High" },
  { id: "i4", contact: "Rachel Moore", email: "rachel.m@proton.me", propertyId: "malibu-oceanfront", message: "Happy to schedule the inspection next Tuesday.", channel: "Website", status: "Replied", agent: "Emma Clark", received: "Jul 16, 2025 · 4:30 PM", priority: "Med" },
  { id: "i5", contact: "Arjun Mehta", email: "arjun.m@luxliving.in", propertyId: "marina-bay", message: "Please send the floor plans and amenities deck.", channel: "WhatsApp", status: "New", agent: "Daniel Lee", received: "Jul 16, 2025 · 1:15 PM", priority: "High" },
  { id: "i6", contact: "Isabella Rossi", email: "i.rossi@finance.it", propertyId: "aspen-chalet", message: "We're ready to move forward with an offer.", channel: "Email", status: "Replied", agent: "David Russo", received: "Jul 16, 2025 · 10:08 AM", priority: "High" },
  { id: "i7", contact: "Robert Sullivan", email: "rsullivan@corp.com", propertyId: "south-beach", message: "Thank you, we have decided to pass for now.", channel: "Website", status: "Closed", agent: "Carlos Vega", received: "Jul 15, 2025 · 5:45 PM", priority: "Low" },
];

export type Lead = {
  id: string;
  name: string;
  source: string;
  propertyId: string;
  value: number;
  score: number;
  stage: "New" | "Contacted" | "Qualified" | "Negotiating" | "Won";
  priority: "High" | "Med" | "Low";
  agent: string;
  updated: string;
};

export const leads: Lead[] = [
  { id: "l1", name: "Oliver Bennett", source: "Website Form", propertyId: "chelsea-penthouse", value: 7850000, score: 92, stage: "New", priority: "High", agent: "David Russo", updated: "Just now" },
  { id: "l2", name: "Rachel Moore", source: "Website", propertyId: "malibu-oceanfront", value: 11500000, score: 88, stage: "New", priority: "Med", agent: "Emma Clark", updated: "3 hr ago" },
  { id: "l3", name: "Khalid Al-Rashid", source: "Email", propertyId: "burj-vista", value: 2100000, score: 85, stage: "Contacted", priority: "High", agent: "Amir Hassan", updated: "1 hr ago" },
  { id: "l4", name: "Marc Dubois", source: "Referral", propertyId: "sunset-ridge", value: 14800000, score: 74, stage: "Qualified", priority: "High", agent: "Emma Clark", updated: "Jul 14" },
  { id: "l5", name: "Henri Dubois", source: "Website", propertyId: "malibu-oceanfront", value: 18000000, score: 95, stage: "Won", priority: "High", agent: "David Russo", updated: "Closed Jul 10" },
  { id: "l6", name: "Sophie Chen", source: "WhatsApp", propertyId: "sunset-ridge", value: 4200000, score: 78, stage: "New", priority: "Med", agent: "Emma Clark", updated: "2 min ago" },
  { id: "l7", name: "Robert Sullivan", source: "Referral", propertyId: "south-beach", value: 3750000, score: 41, stage: "Contacted", priority: "Low", agent: "Carlos Vega", updated: "Yesterday" },
  { id: "l8", name: "Isabella Rossi", source: "Email", propertyId: "aspen-chalet", value: 6400000, score: 95, stage: "Qualified", priority: "High", agent: "David Russo", updated: "Yesterday" },
  { id: "l9", name: "Yuki Tanaka", source: "Website", propertyId: "marina-bay", value: 5200000, score: 81, stage: "Negotiating", priority: "Med", agent: "Daniel Lee", updated: "Jul 12" },
  { id: "l10", name: "Lucia Romano", source: "Website", propertyId: "marina-bay", value: 5600000, score: 90, stage: "Won", priority: "High", agent: "Daniel Lee", updated: "Closed Jul 8" },
  { id: "l11", name: "Arjun Mehta", source: "WhatsApp", propertyId: "marina-bay", value: 3200000, score: 65, stage: "New", priority: "Med", agent: "Daniel Lee", updated: "5 min ago" },
];

export const bookings = [
  { id: "b1", property: "The Chelsea Penthouse", client: "Oliver Bennett", agent: "David Russo", date: "Jul 21, 2025", time: "2:00 PM", type: "In-person tour", status: "Confirmed" },
  { id: "b2", property: "Sunset Ridge Villa", client: "Sophie Chen", agent: "Emma Clark", date: "Jul 22, 2025", time: "11:00 AM", type: "Virtual tour", status: "Confirmed" },
  { id: "b3", property: "Malibu Oceanfront Estate", client: "Rachel Moore", agent: "Emma Clark", date: "Jul 23, 2025", time: "4:30 PM", type: "Inspection", status: "Pending" },
  { id: "b4", property: "Aspen Mountain Chalet", client: "Isabella Rossi", agent: "David Russo", date: "Jul 24, 2025", time: "10:00 AM", type: "Final walkthrough", status: "Confirmed" },
  { id: "b5", property: "Marina Bay Condo", client: "Yuki Tanaka", agent: "Daniel Lee", date: "Jul 25, 2025", time: "3:00 PM", type: "In-person tour", status: "Confirmed" },
];

export const blogPosts = [
  { id: "luxury-2026", title: "Luxury Real Estate in 2026: Where Are the Best Investment Markets?", excerpt: "Our analysts break down the top global cities for capital appreciation and rental yield in the coming year.", date: "Jul 14, 2025", category: "Market Insights", image: p2, author: "Emma Clark" },
  { id: "finance-first", title: "How to Finance Your First Luxury Property Purchase", excerpt: "From jumbo loans to private banking, here's everything you need to know about funding a high-value home.", date: "Jul 8, 2025", category: "Guides", image: p3, author: "David Russo" },
  { id: "smart-home", title: "Smart Home Features That Add Value to Your Property", excerpt: "The technologies and integrations that move the needle on appraisal and resale.", date: "Jul 2, 2025", category: "Property Tips", image: p4, author: "Amir Hassan" },
  { id: "global-hotspots", title: "Five Emerging Global Hotspots for Luxury Buyers", excerpt: "Beyond New York and Dubai — the markets attracting serious capital right now.", date: "Jun 26, 2025", category: "Market Insights", image: p1, author: "Daniel Lee" },
];

export const campaigns = [
  { id: "c1", name: "July New Listings", audience: "All Subscribers", sent: 842, opens: "48.2%", clicks: "12.7%", status: "Sent", date: "Jul 14, 2025" },
  { id: "c2", name: "Investor Quarterly Brief Q3", audience: "Investors", sent: 312, opens: "61.4%", clicks: "22.1%", status: "Sent", date: "Jul 10, 2025" },
  { id: "c3", name: "Open House — Beverly Hills", audience: "CA Buyers", sent: 0, opens: "—", clicks: "—", status: "Draft", date: "—" },
  { id: "c4", name: "Welcome Series — Drip", audience: "New Signups", sent: 1208, opens: "55.0%", clicks: "18.3%", status: "Active", date: "Ongoing" },
];

export const investOpportunities = [
  { id: "manhattan-tower", name: "Midtown Manhattan Office Tower", location: "Midtown Manhattan, NY", price: 25000000, raised: 18500000, target: 25000000, yield: "8.2%", term: "5 yr", risk: "Moderate", category: "Commercial" },
  { id: "dubai-boutique", name: "Dubai Marina Boutique Resort", location: "Marina, Dubai", price: 9000000, raised: 6400000, target: 9000000, yield: "14.6%", term: "3 yr", risk: "Growth", category: "Hospitality" },
  { id: "miami-portfolio", name: "Miami Beach Villas Portfolio", location: "Miami Beach, FL", price: 18000000, raised: 12000000, target: 18000000, yield: "11.3%", term: "4 yr", risk: "Balanced", category: "Residential" },
];

export const fmtUSD = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M` : `$${n.toLocaleString()}`;

export const fmtUSDFull = (n: number) => `$${n.toLocaleString()}`;

export const propertyById = (id: string) => properties.find((p) => p.id === id);
