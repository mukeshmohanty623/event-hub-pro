import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Event created", description: "The event has been created successfully." });
    navigate("/admin/events");
  };

  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-500">
      <button onClick={() => navigate("/admin/events")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to events
      </button>

      <h1 className="text-2xl font-semibold tracking-tight mb-6" style={{ lineHeight: "1.2" }}>Create event</h1>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {["Basics", "Schedule", "Rules", "Review"].map((label, i) => (
          <div key={label} className="flex-1 text-center">
            <div className={`h-1.5 rounded-full transition-colors mb-1 ${i + 1 <= step ? "bg-primary" : "bg-border"}`} />
            <span className={`text-[10px] ${i + 1 <= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
          </div>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle className="text-lg">Basics</CardTitle>
              <CardDescription>Event name, description, and location.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="space-y-2"><Label>Event name</Label><Input required placeholder="e.g. Friday Football" /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea placeholder="What guardians will see when browsing activities…" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Programme</Label><Input placeholder="e.g. Sports" /></div>
                  <div className="space-y-2"><Label>Tags</Label><Input placeholder="after-school, sports" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Age min</Label><Input type="number" defaultValue={8} /></div>
                  <div className="space-y-2"><Label>Age max</Label><Input type="number" defaultValue={16} /></div>
                </div>
                <div className="space-y-2"><Label>Capacity per session</Label><Input type="number" defaultValue={20} /></div>
                <div className="space-y-2"><Label>Location name</Label><Input placeholder="e.g. OYCI Hub" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Address</Label><Input /></div>
                  <div className="space-y-2"><Label>Postcode</Label><Input placeholder="FK10" /></div>
                </div>
                <Button type="submit" className="w-full active:scale-[0.98] transition-transform">Next <ArrowRight className="w-4 h-4" /></Button>
              </form>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle className="text-lg">Schedule</CardTitle>
              <CardDescription>Set the date, time, and recurrence.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                <div className="space-y-2"><Label>Start date</Label><Input type="date" required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Start time</Label><Input type="time" required /></div>
                  <div className="space-y-2"><Label>End time</Label><Input type="time" required /></div>
                </div>
                <div className="space-y-2"><Label>Repeat</Label><Input placeholder="e.g. Weekly on Fridays" /></div>
                <div className="space-y-2"><Label>End date (for series)</Label><Input type="date" /></div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1">Next <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle className="text-lg">Booking rules</CardTitle>
              <CardDescription>Control how families can book.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div><Label>Booking required</Label><p className="text-xs text-muted-foreground">Families must book in advance</p></div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div><Label>Drop-in allowed</Label><p className="text-xs text-muted-foreground">Young people can turn up without booking</p></div>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Booking opens</Label><Input type="datetime-local" /></div>
                  <div className="space-y-2"><Label>Booking closes before</Label><Input placeholder="e.g. 2 hours" /></div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1">Next <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle className="text-lg">Review & publish</CardTitle>
              <CardDescription>Check everything looks right before creating.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground space-y-1">
                  <p>This is a summary preview. In the full version, all entered details will be shown here for review.</p>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(3)} className="flex-1">Back</Button>
                  <Button type="submit" className="flex-1 active:scale-[0.98] transition-transform">Create event</Button>
                </div>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default CreateEvent;
