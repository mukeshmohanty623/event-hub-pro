import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Minus } from "lucide-react";
import { mockEventInstances, mockAttendance } from "@/lib/mock-data";

const AdminAttendance = () => {
  const [selectedInstance, setSelectedInstance] = useState(mockEventInstances[5].id); // ei-6 in_progress
  const [attendance, setAttendance] = useState(mockAttendance);

  const instance = mockEventInstances.find((i) => i.id === selectedInstance);

  const toggleAttendance = (bookingId: string, value: boolean) => {
    setAttendance((prev) =>
      prev.map((a) => (a.id === bookingId ? { ...a, attended: value } : a))
    );
  };

  const present = attendance.filter((a) => a.attended === true).length;
  const absent = attendance.filter((a) => a.attended === false).length;
  const unmarked = attendance.filter((a) => a.attended === undefined).length;

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Attendance</h1>
        <p className="text-sm text-muted-foreground mt-1">Record who attended each session.</p>
      </div>

      <Select value={selectedInstance} onValueChange={setSelectedInstance}>
        <SelectTrigger className="max-w-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {mockEventInstances.map((inst) => (
            <SelectItem key={inst.id} value={inst.id}>
              {inst.event_name} — {inst.date} {inst.start_time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {instance && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold tabular-nums" style={{ color: "hsl(174 62% 38%)" }}>{present}</p>
                <p className="text-[10px] text-muted-foreground">Present</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold tabular-nums text-destructive">{absent}</p>
                <p className="text-[10px] text-muted-foreground">Absent</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold tabular-nums text-muted-foreground">{unmarked}</p>
                <p className="text-[10px] text-muted-foreground">Unmarked</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance list */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{instance.event_name}</CardTitle>
              <CardDescription>{instance.date} · {instance.start_time}–{instance.end_time} · {instance.location_name}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {attendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{record.young_person_name}</p>
                      <Badge variant="outline" className="text-[10px] mt-0.5">{record.status}</Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant={record.attended === true ? "default" : "outline"}
                        className="h-8 w-8 active:scale-[0.95] transition-transform"
                        style={record.attended === true ? { backgroundColor: "hsl(174 62% 38%)" } : {}}
                        onClick={() => toggleAttendance(record.id, true)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant={record.attended === false ? "destructive" : "outline"}
                        className="h-8 w-8 active:scale-[0.95] transition-transform"
                        onClick={() => toggleAttendance(record.id, false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminAttendance;
