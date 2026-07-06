import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Globe2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  Building2,
  Send,
  Star,
  Users,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useState } from "react";

const offices = [
  { 
    city: "Los Angeles", 
    label: "Headquarters",
    address: "9255 Sunset Blvd, Suite 1100\nWest Hollywood, CA 90069", 
    phone: "+1 (310) 555-0188",
    flag: "🇺🇸"
  },
  { 
    city: "New York", 
    label: "East Coast",
    address: "450 Park Avenue, 22nd Floor\nNew York, NY 10022", 
    phone: "+1 (212) 555-0142",
    flag: "🇺🇸"
  },
  { 
    city: "Dubai", 
    label: "Middle East",
    address: "Emirates Towers, Level 41\nSheikh Zayed Rd, Dubai", 
    phone: "+971 4 555 0166",
    flag: "🇦🇪"
  },
  { 
    city: "Singapore", 
    label: "Asia Pacific",
    address: "One Raffles Place, Tower 2\nSingapore 048616", 
    phone: "+65 6555 0199",
    flag: "🇸🇬"
  },
];

const faqs = [
  { 
    q: "How quickly will an advisor respond?", 
    a: "Every inquiry is reviewed within 4 business hours. A senior advisor personally reaches out within 24 hours — often sooner for urgent matters.",
    icon: Clock
  },
  { 
    q: "Do you work with international buyers?", 
    a: "Yes — we routinely close cross-border transactions across the US, EU, Middle East and APAC. Our legal team handles multi-jurisdiction complexities seamlessly.",
    icon: Globe2
  },
  { 
    q: "Is my inquiry confidential?", 
    a: "Absolutely. All conversations are handled under strict NDA and never shared with third parties. Discretion is foundational to how we operate.",
    icon: ShieldCheck
  },
];

const stats = [
  { value: "12+", label: "Global Offices", icon: Building2 },
  { value: "24h", label: "Response Time", icon: Clock },
  { value: "98%", label: "Client Satisfaction", icon: Star },
  { value: "500+", label: "Elite Advisors", icon: Users },
];

export default function Contact() {
  useDocumentTitle("Contact — LuxeEstate");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully", {
      description: "A senior advisor will contact you within 24 hours.",
      duration: 5000,
    });
    
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/[0.02] to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.06),transparent_50%)]" />
        
        <div className="container-page relative py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Concierge Service
            </div>
            
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Let's start a{" "}
              <span className="bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">conversation</span>
            </h1>
            
            <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg max-w-2xl mx-auto">
              Whether you're acquiring a landmark estate or seeking discreet representation, 
              our senior advisors are ready to guide you — personally and privately.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 transition-all hover:border-primary/20 hover:bg-card">
                  <stat.icon className="mx-auto h-5 w-5 text-primary/60" />
                  <p className="mt-2 text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="border-b border-border/50 bg-surface-muted/30">
        <div className="container-page py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, title: "Call Us", detail: "+1 (310) 555-0188", sub: "Mon–Fri, 8am–8pm PT", href: "tel:+13105550188", accent: "from-blue-500/10 to-blue-500/5" },
              { icon: Mail, title: "Email", detail: "concierge@luxeestate.com", sub: "Reply within 4 hours", href: "mailto:concierge@luxeestate.com", accent: "from-emerald-500/10 to-emerald-500/5" },
              { icon: MessageSquare, title: "WhatsApp", detail: "+1 (310) 555-0177", sub: "Instant chat with advisor", href: "https://wa.me/13105550177", accent: "from-green-500/10 to-green-500/5" },
              { icon: MapPin, title: "Visit HQ", detail: "West Hollywood, CA", sub: "By appointment only", href: "#offices", accent: "from-amber-500/10 to-amber-500/5" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-transform group-hover:scale-110">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold tracking-wide">{item.title}</p>
                  <p className="mt-1 text-base font-medium">{item.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
                  <ChevronRight className="mt-3 h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Offices */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          
          {/* Left Column - Information */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Network</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Global reach,<br />personal touch.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
              With offices in the world's most desirable markets, our advisors bring local expertise 
              and global connections to every engagement.
            </p>

            {/* Offices Grid */}
            <div id="offices" className="mt-10 grid gap-4 sm:grid-cols-2">
              {offices.map((office) => (
                <div 
                  key={office.city} 
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="absolute right-3 top-3 text-2xl opacity-20 transition-opacity group-hover:opacity-40">
                    {office.flag}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {office.label}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold">{office.city}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{office.address}</p>
                  <a 
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* Premium Call-to-Action */}
            <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-8 text-primary-foreground">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative">
                <Sparkles className="h-6 w-6 text-primary-foreground/80" />
                <p className="mt-4 text-xl font-semibold">Portfolio above $25M?</p>
                <p className="mt-2 text-sm text-primary-foreground/80 leading-relaxed">
                  Request a private, NDA-covered consultation with our Managing Director. 
                  White-glove service for exceptional properties.
                </p>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="mt-6 gap-2 bg-white text-primary hover:bg-white/90"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Private Call
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary/30 via-brand/20 to-primary/30 opacity-0 transition-opacity duration-500 hover:opacity-100" />
              
              <form
                onSubmit={handleSubmit}
                className="relative rounded-3xl border border-border/50 bg-card p-8 shadow-2xl shadow-black/5 md:p-10"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold tracking-tight">Send us a message</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First name <span className="text-primary">*</span>
                    </Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required 
                      className="mt-2 h-12 border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last name <span className="text-primary">*</span>
                    </Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      placeholder="Smith"
                      required 
                      className="mt-2 h-12 border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-primary">*</span>
                    </Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required 
                      className="mt-2 h-12 border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-2 h-12 border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    />
                  </div>

                  {/* Interest */}
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium">I'm interested in</Label>
                    <Select defaultValue="buying">
                      <SelectTrigger className="mt-2 h-12 border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">Buying a property</SelectItem>
                        <SelectItem value="selling">Selling / listing a property</SelectItem>
                        <SelectItem value="renting">Long-term rental</SelectItem>
                        <SelectItem value="investing">Investment opportunities</SelectItem>
                        <SelectItem value="valuation">Property valuation</SelectItem>
                        <SelectItem value="other">Something else</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget */}
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium">Approximate budget</Label>
                    <Select defaultValue="3-15">
                      <SelectTrigger className="mt-2 h-12 border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1">Under $1M</SelectItem>
                        <SelectItem value="1-3">$1M – $3M</SelectItem>
                        <SelectItem value="3-15">$3M – $15M</SelectItem>
                        <SelectItem value="15-50">$15M – $50M</SelectItem>
                        <SelectItem value="50+">$50M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      How can we help? <span className="text-primary">*</span>
                    </Label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about the property you're looking for, your timeline, and any specific requirements..."
                      required
                      className="mt-2 w-full resize-none border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/10" 
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      The more details you share, the better we can assist you.
                    </p>
                  </div>

                  {/* Newsletter */}
                  <label className="sm:col-span-2 flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Send me curated listings and market insights. You can unsubscribe anytime.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="mt-8 w-full gap-2 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="font-medium underline underline-offset-4 transition-colors hover:text-foreground">
                    Privacy Policy
                  </a>
                  {" "}and{" "}
                  <a href="/terms" className="font-medium underline underline-offset-4 transition-colors hover:text-foreground">
                    Terms of Service
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden border-t border-border/50 bg-surface-muted/30 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.04),transparent_70%)]" />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Quick Answers
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know before reaching out.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <div 
                key={faq.q} 
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                <div className="absolute right-4 top-4 text-6xl font-bold text-primary/[0.03] select-none transition-colors group-hover:text-primary/[0.06]">
                  ?
                </div>
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5">
                    <faq.icon className="h-5 w-5 text-primary/60" />
                  </div>
                  <p className="mt-4 text-base font-semibold leading-snug">{faq.q}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Still have questions?{" "}
              <a href="mailto:concierge@luxeestate.com" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                Email us directly
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}