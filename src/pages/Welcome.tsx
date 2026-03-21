import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "linear-gradient(170deg, hsl(322 80% 43%) 0%, hsl(322 70% 32%) 40%, hsl(240 10% 12%) 100%)" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo area */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-white text-3xl font-bold tracking-tight">
            OYCI
          </div>
          <h1 className="text-2xl font-semibold text-white text-center" style={{ lineHeight: "1.2" }}>
            Ochil Youths Community Improvement
          </h1>
          <p className="text-white/70 text-center text-sm max-w-[280px]">
            Book activities and track your family's participation.
          </p>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <Button asChild size="lg" className="w-full bg-white text-foreground hover:bg-white/90 font-medium active:scale-[0.98] transition-transform">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white font-medium active:scale-[0.98] transition-transform">
            <Link to="/register">Create an account</Link>
          </Button>
        </div>

        {/* Support message */}
        <div className="flex items-start gap-2 rounded-lg bg-white/10 backdrop-blur p-3 text-white/80 text-xs leading-relaxed">
          <Phone className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            If you cannot use this website, call us on{" "}
            <a href="tel:01onal" className="underline underline-offset-2">01259 000 000</a>{" "}
            and we will book for you.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
