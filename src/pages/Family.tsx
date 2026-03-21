import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, User, Calendar } from "lucide-react";
import { mockFamily, mockGuardian, mockChildren } from "@/lib/mock-data";

const Family = () => {
  const [children, setChildren] = useState(mockChildren);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    setChildren((prev) => [
      ...prev,
      {
        id: `yp-${Date.now()}`,
        family_id: mockFamily.id,
        first_name: data.get("firstName") as string,
        last_name: data.get("lastName") as string || mockGuardian.last_name,
        preferred_name: data.get("preferredName") as string || undefined,
        date_of_birth: data.get("dob") as string,
        school_name: data.get("school") as string || undefined,
        is_active: true,
      },
    ]);
    setDialogOpen(false);
    form.reset();
  };

  const getAge = (dob: string) => {
    const diff = new Date().getTime() - new Date(dob).getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Family</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockFamily.name}</p>
        </div>
      </div>

      {/* Guardian */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Guardian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p className="font-medium">{mockGuardian.first_name} {mockGuardian.last_name}</p>
          <p className="text-sm text-muted-foreground">{mockGuardian.email}</p>
          <p className="text-sm text-muted-foreground">{mockGuardian.phone}</p>
        </CardContent>
      </Card>

      {/* Children */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Children</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 text-xs active:scale-[0.97] transition-transform">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add child
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a child</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddChild} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="addFirst">First name</Label>
                    <Input id="addFirst" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addLast">Last name</Label>
                    <Input id="addLast" name="lastName" placeholder={mockGuardian.last_name} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addPreferred">Preferred name</Label>
                  <Input id="addPreferred" name="preferredName" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addDob">Date of birth</Label>
                  <Input id="addDob" name="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addSchool">School</Label>
                  <Input id="addSchool" name="school" />
                </div>
                <Button type="submit" className="w-full active:scale-[0.98] transition-transform">Add child</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {children.map((child) => (
            <Card key={child.id} className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">
                      {child.first_name} {child.last_name}
                      {child.preferred_name && <span className="text-muted-foreground"> ({child.preferred_name})</span>}
                    </p>
                    <Badge variant="secondary" className="text-[10px]">Age {getAge(child.date_of_birth)}</Badge>
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                    {child.school_name && <span>{child.school_name}</span>}
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{child.school_year || "—"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Family;
