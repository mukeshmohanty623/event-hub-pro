import { mockGuardian, mockFamily } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <h1 className="text-2xl font-semibold tracking-tight" style={{ lineHeight: "1.2" }}>Account</h1>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-muted-foreground">Name</span>
            <span>{mockGuardian.first_name} {mockGuardian.last_name}</span>
            <span className="text-muted-foreground">Email</span>
            <span>{mockGuardian.email}</span>
            <span className="text-muted-foreground">Phone</span>
            <span>{mockGuardian.phone}</span>
            <span className="text-muted-foreground">Postcode</span>
            <span>{mockFamily.postcode}</span>
          </div>
          <Button variant="outline" size="sm" className="active:scale-[0.97] transition-transform">
            Edit details
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Consents</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Confidentiality agreement: <span className="text-foreground font-medium">Agreed</span></p>
          <p>Photo/video consent: <span className="text-foreground font-medium">Agreed</span></p>
          <p>Medical consent: <span className="text-foreground font-medium">Agreed</span></p>
          <Button variant="outline" size="sm" className="active:scale-[0.97] transition-transform mt-2">
            Review consents
          </Button>
        </CardContent>
      </Card>

      <Button asChild variant="destructive" size="sm" className="active:scale-[0.98] transition-transform">
        <Link to="/">Sign out</Link>
      </Button>
    </div>
  );
};

export default Account;
