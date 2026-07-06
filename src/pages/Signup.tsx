import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Check } from "lucide-react";
import { toast } from "sonner";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { AuthCarousel } from "@/components/auth-carousel";

const perks = [
  "Save & compare luxury listings",
  "Get first access to new estates",
  "Private concierge & tour booking",
];

export default function Signup() {
  useDocumentTitle("Create account — LuxeEstate");
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthCarousel />
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-6 flex items-center gap-2 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-md gradient-brand text-primary-foreground"><Building2 className="h-4 w-4" /></span>
            <span className="text-base font-semibold">LuxeEstate</span>
          </Link>
          <h1 className="text-2xl font-display md:text-3xl">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join thousands of buyers, sellers and investors.</p>

          <ul className="mt-4 space-y-1.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-soft text-primary">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget as HTMLFormElement);
              if ((f.get("pw") as string).length < 6) {
                toast.error("Password must be at least 6 characters");
                return;
              }
              toast.success("Account created — welcome to LuxeEstate");
              nav("/admin");
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div><Label htmlFor="fn">First name</Label><Input id="fn" name="fn" required className="mt-1" /></div>
              <div><Label htmlFor="ln">Last name</Label><Input id="ln" name="ln" required className="mt-1" /></div>
            </div>
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required className="mt-1" /></div>
            <div><Label htmlFor="pw">Password</Label><Input id="pw" name="pw" type="password" required minLength={6} className="mt-1" /></div>
            <label className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <input type="checkbox" required className="mt-0.5" />
              <span>I agree to the <Link to="#" className="text-primary hover:underline">Terms</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.</span>
            </label>
            <Button type="submit" className="w-full">Create account</Button>
            <Button type="button" variant="outline" className="w-full">Continue with Google</Button>
          </form>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
