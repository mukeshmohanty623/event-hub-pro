import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Copy, Pencil, Eye } from "lucide-react";
import { mockEvents, mockEventInstances } from "@/lib/mock-data";

const AdminEvents = () => {
  const [search, setSearch] = useState("");

  const filtered = mockEvents.filter((ev) =>
    ev.name.toLowerCase().includes(search.toLowerCase()) ||
    ev.programme?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Events</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all activities and programmes.</p>
        </div>
        <Button asChild size="sm" className="active:scale-[0.97] transition-transform">
          <Link to="/admin/events/create"><Plus className="w-4 h-4 mr-1" /> Create event</Link>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search events…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Event name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Programme</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Sessions</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Capacity</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Booking</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((event) => {
                  const sessions = mockEventInstances.filter((i) => i.event_id === event.id);
                  return (
                    <tr key={event.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{event.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{event.programme || "—"}</td>
                      <td className="px-4 py-3 tabular-nums">{sessions.length}</td>
                      <td className="px-4 py-3 tabular-nums">{event.capacity}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {event.booking_required && <Badge variant="secondary" className="text-[10px]">Required</Badge>}
                          {event.drop_in_allowed && <Badge variant="outline" className="text-[10px]">Drop-in</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-[10px]">
                          {event.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="w-3.5 h-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
