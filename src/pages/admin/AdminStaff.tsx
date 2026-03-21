import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { mockStaff } from "@/lib/mock-data";

const AdminStaff = () => {
  const [search, setSearch] = useState("");

  const filtered = mockStaff.filter((s) =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    superadmin: "bg-primary text-primary-foreground",
    coordinator: "bg-accent text-accent-foreground",
    staff: "bg-secondary text-secondary-foreground",
    finance: "bg-secondary text-secondary-foreground",
    reporting: "bg-secondary text-secondary-foreground",
  };

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Staff</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage team members and roles.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search staff…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="space-y-3">
        {filtered.map((staff) => (
          <Card key={staff.id} className={`border-0 shadow-sm ${!staff.is_active ? "opacity-60" : ""}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="text-sm font-medium">{staff.first_name[0]}{staff.last_name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-sm">{staff.first_name} {staff.last_name}</p>
                  <Badge className={`text-[10px] ${roleColors[staff.role]}`}>{staff.role}</Badge>
                  {!staff.is_active && <Badge variant="outline" className="text-[10px] text-destructive border-destructive/30">Inactive</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{staff.email} · {staff.phone}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 h-8 text-xs active:scale-[0.97] transition-transform">
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStaff;
