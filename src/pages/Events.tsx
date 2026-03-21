import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Search, CheckCircle2 } from "lucide-react";
import { mockEvents, mockEventInstances, mockChildren } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const [search, setSearch] = useState("");
  const [booked, setBooked] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const filtered = mockEvents.filter((ev) =>
    ev.name.toLowerCase().includes(search.toLowerCase()) ||
    ev.programme?.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = (instanceId: string, eventName: string) => {
    // Quick book for first child
    const child = mockChildren[0];
    setBooked((prev) => ({ ...prev, [instanceId]: child.first_name }));
    toast({
      title: "Booked!",
      description: `${child.preferred_name || child.first_name} is booked into ${eventName}.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Activities</h1>
        <p className="text-sm text-muted-foreground mt-1">Find and book activities for your family.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search activities…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="space-y-4">
        {filtered.map((event) => {
          const instances = mockEventInstances.filter((i) => i.event_id === event.id && i.status === "scheduled");
          return (
            <Card key={event.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      {event.programme && (
                        <Badge variant="secondary" className="mt-1 text-[10px]">{event.programme}</Badge>
                      )}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location_name}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />Ages {event.age_min}–{event.age_max}</span>
                    <span>Capacity: {event.capacity}</span>
                  </div>
                </div>

                {/* Sessions */}
                {instances.length > 0 && (
                  <div className="border-t bg-muted/30 divide-y">
                    {instances.map((inst) => {
                      const full = inst.booked_count >= inst.capacity;
                      const isBooked = booked[inst.id];
                      return (
                        <div key={inst.id} className="px-4 py-3 flex items-center justify-between gap-3">
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{inst.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{inst.start_time}</span>
                            <span className="tabular-nums">{inst.booked_count}/{inst.capacity}</span>
                          </div>
                          {isBooked ? (
                            <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "hsl(174 62% 38%)" }}>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Booked
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              variant={full ? "outline" : "default"}
                              className="h-7 text-xs active:scale-[0.97] transition-transform"
                              onClick={() => !full && handleBook(inst.id, event.name)}
                            >
                              {full ? "Join waitlist" : "Book"}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
