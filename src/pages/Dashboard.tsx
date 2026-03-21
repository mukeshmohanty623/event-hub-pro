import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { mockBookings, mockEventInstances, mockChildren, mockGuardian } from "@/lib/mock-data";

const Dashboard = () => {
  const upcomingBookings = mockBookings.filter((b) => b.status === "confirmed");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>
          Hi, {mockGuardian.first_name} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here's what's coming up for your family.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold tabular-nums text-primary">{mockChildren.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Children</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold tabular-nums" style={{ color: "hsl(174 62% 38%)" }}>{upcomingBookings.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Upcoming bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Upcoming</h2>
          <Link to="/events" className="text-xs text-primary hover:underline">View all activities</Link>
        </div>
        <div className="space-y-3">
          {upcomingBookings.map((booking) => {
            const instance = mockEventInstances.find((i) => i.id === booking.event_instance_id);
            if (!instance) return null;
            return (
              <Card key={booking.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <p className="font-medium text-sm truncate">{instance.event_name}</p>
                      <p className="text-xs text-muted-foreground">for {booking.young_person_name}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{instance.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{instance.start_time}–{instance.end_time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{instance.location_name}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] shrink-0">Confirmed</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Waitlisted */}
      {mockBookings.some((b) => b.status === "waitlisted") && (
        <div>
          <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Waiting list</h2>
          {mockBookings.filter((b) => b.status === "waitlisted").map((booking) => {
            const instance = mockEventInstances.find((i) => i.id === booking.event_instance_id);
            if (!instance) return null;
            return (
              <Card key={booking.id} className="border-0 shadow-sm border-l-4 border-l-[hsl(40,90%,50%)]">
                <CardContent className="p-4">
                  <p className="font-medium text-sm">{instance.event_name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">for {booking.young_person_name} · We'll let you know when a space opens up.</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Button asChild variant="outline" className="w-full active:scale-[0.98] transition-transform">
        <Link to="/events">
          Browse activities <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default Dashboard;
