import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, AlertTriangle, Plus } from "lucide-react";
import { mockEventInstances, mockStaff } from "@/lib/mock-data";

const AdminDashboard = () => {
  const todaysSessions = mockEventInstances.filter((i) => i.status === "scheduled" || i.status === "in_progress");
  const totalBooked = todaysSessions.reduce((s, i) => s + i.booked_count, 0);
  const underCapacity = todaysSessions.filter((i) => i.booked_count < i.capacity * 0.5);

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of today's activity.</p>
        </div>
        <Button asChild size="sm" className="active:scale-[0.97] transition-transform">
          <Link to="/admin/events/create"><Plus className="w-4 h-4 mr-1" /> Create event</Link>
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2"><Calendar className="w-4 h-4" /><span className="text-xs">Sessions</span></div>
            <p className="text-2xl font-bold tabular-nums">{todaysSessions.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2"><Users className="w-4 h-4" /><span className="text-xs">Young people</span></div>
            <p className="text-2xl font-bold tabular-nums">{totalBooked}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2"><AlertTriangle className="w-4 h-4" /><span className="text-xs">Under capacity</span></div>
            <p className="text-2xl font-bold tabular-nums">{underCapacity.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2"><Users className="w-4 h-4" /><span className="text-xs">Active staff</span></div>
            <p className="text-2xl font-bold tabular-nums">{mockStaff.filter((s) => s.is_active).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's events table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Today's sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Time</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Event</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Bookings</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {todaysSessions.map((inst) => (
                  <tr key={inst.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 tabular-nums whitespace-nowrap">{inst.start_time}–{inst.end_time}</td>
                    <td className="px-4 py-3 font-medium">{inst.event_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inst.location_name}</td>
                    <td className="px-4 py-3 tabular-nums">{inst.booked_count}/{inst.capacity}</td>
                    <td className="px-4 py-3">
                      <Badge variant={inst.status === "in_progress" ? "default" : "secondary"} className="text-[10px]">
                        {inst.status === "in_progress" ? "Live" : "Scheduled"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
