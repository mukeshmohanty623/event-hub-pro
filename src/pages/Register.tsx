import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-muted">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-3 duration-500">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${s <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>

        <Card className="shadow-lg border-0">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Your details</CardTitle>
                <CardDescription>Tell us a little about yourself so we can set up your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input id="postcode" placeholder="FK10 1AB" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regEmail">Email address</Label>
                    <Input id="regEmail" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regPhone">Phone number</Label>
                    <Input id="regPhone" type="tel" placeholder="07700 000 000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regPassword">Password</Label>
                    <Input id="regPassword" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regConfirm">Confirm password</Label>
                    <Input id="regConfirm" type="password" required />
                  </div>
                  <Button type="submit" className="w-full active:scale-[0.98] transition-transform">
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Add your first child</CardTitle>
                <CardDescription>We need a few details so we can find the right activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="childFirst">First name</Label>
                      <Input id="childFirst" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childLast">Last name</Label>
                      <Input id="childLast" placeholder="Same as yours if blank" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childPreferred">Preferred name (optional)</Label>
                    <Input id="childPreferred" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childDob">Date of birth</Label>
                    <Input id="childDob" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childSchool">School</Label>
                    <Input id="childSchool" placeholder="Start typing school name…" />
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 active:scale-[0.98] transition-transform">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 active:scale-[0.98] transition-transform">
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl">Confidentiality & consent</CardTitle>
                <CardDescription>We want to keep you and your information safe. Please read and agree so we can support your family.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFinish} className="space-y-4">
                  <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground leading-relaxed">
                    OYCI is committed to safeguarding all young people. Information you share is stored securely and only used to support your family's participation.
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 accent-[hsl(322,80%,43%)]" />
                    <span className="text-sm">I understand and agree to the confidentiality agreement.</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[hsl(322,80%,43%)]" />
                    <span className="text-sm">I consent to photos/videos of my child being used by OYCI.</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[hsl(322,80%,43%)]" />
                    <span className="text-sm">I agree to emergency medical treatment if needed.</span>
                  </label>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 active:scale-[0.98] transition-transform">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 active:scale-[0.98] transition-transform">
                      Complete registration
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
