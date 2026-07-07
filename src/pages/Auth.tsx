import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { AuthCarousel } from "@/components/auth-carousel";

export default function Auth() {
  useDocumentTitle("Sign in — Vibby Luxury Home");
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthCarousel />
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-6 flex items-center gap-2 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-md gradient-brand text-primary-foreground"><Building2 className="h-4 w-4" /></span>
            <span className="text-base font-semibold">Vibby Luxury Home</span>
          </Link>
          <h1 className="text-2xl font-display md:text-3xl">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to access your dashboard.</p>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => { e.preventDefault(); toast.success("Signed in"); nav("/admin"); }}
          >
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@example.com" required className="mt-1" /></div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pw">Password</Label>
                <Link to="#" className="text-[11px] text-primary hover:underline">Forgot?</Link>
              </div>
              <Input id="pw" type="password" required className="mt-1" />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
            <Button type="button" variant="outline" className="w-full">Continue with Google</Button>
          </form>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
