import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, FileText, Shield, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleClearCache = () => {
    toast.success("Cache cleared successfully!");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences</p>
        </div>

        <Card className="mb-4">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Credits Balance</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">127</div>
                <p className="text-sm text-muted-foreground">Available Credits</p>
              </div>
              <Button onClick={() => window.location.href = "/subscription"}>
                Get More Credits
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t">
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => toast.info("Credit usage history coming soon")}
              >
                View Usage History →
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5" />
                Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="cn">中文</SelectItem>
                    <SelectItem value="jp">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Legal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Terms of Service
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Purchase Terms
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleClearCache}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <LogOut className="w-5 h-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
