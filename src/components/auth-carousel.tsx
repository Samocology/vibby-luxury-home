import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import hero from "@/assets/hero-mansion.jpg";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

const slides = [
  { src: hero, quote: "The most refined way to discover and manage luxury real estate.", cite: "— Architectural Digest" },
  { src: p1, quote: "Trophy oceanfront estates with a concierge experience unlike any other.", cite: "— Robb Report" },
  { src: p2, quote: "A skyline of possibility — curated properties in the world's best cities.", cite: "— Forbes" },
  { src: p3, quote: "Where architectural elegance meets uncompromising service.", cite: "— Elle Decor" },
];

export function AuthCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative hidden lg:block">
      {slides.map((s, idx) => (
        <img
          key={idx}
          src={s.src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-tr from-sidebar/95 via-sidebar/70 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-10 text-white">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md gradient-brand text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold">Vibby Luxury Home</span>
        </Link>
        <div>
          <p className="text-2xl font-display leading-tight md:text-3xl">"{slides[i].quote}"</p>
          <p className="mt-3 text-xs text-white/70">{slides[i].cite}</p>
          <div className="mt-6 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
