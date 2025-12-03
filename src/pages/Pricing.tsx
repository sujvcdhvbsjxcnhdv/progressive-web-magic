import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sparkles, Zap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handlePurchase = (plan: string) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    toast.success(`Redirecting to payment for ${plan}...`);
    setTimeout(() => {
      toast.success("Payment successful!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with back button */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Pricing</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs defaultValue="membership" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="membership">Chat Membership</TabsTrigger>
            <TabsTrigger value="credits">Video Credits</TabsTrigger>
          </TabsList>

          {/* Chat Membership Tab */}
          <TabsContent value="membership" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Sparkles className="w-5 h-5" />
                  Basic Membership
                </CardTitle>
                <p className="text-center text-sm text-muted-foreground">Perfect for casual users</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$14.99<span className="text-lg text-muted-foreground">/month</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">500 messages/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Access all characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Standard response speed</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={() => handlePurchase("Basic Membership")}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">⚡ Recommended</Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Zap className="w-5 h-5" />
                  Chat Package
                </CardTitle>
                <p className="text-center text-sm text-muted-foreground">Designed for active users</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$39.99<span className="text-lg text-muted-foreground">/month</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">2000 messages/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Access all characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Priority response speed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Exclusive character access</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={() => handlePurchase("Chat Package")}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Unlimited Package</CardTitle>
                <p className="text-center text-sm text-muted-foreground">Unlimited chat experience</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$49.99<span className="text-lg text-muted-foreground">/month</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Unlimited messages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Access all characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Fastest response speed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Exclusive character access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={() => handlePurchase("Unlimited Package")}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Credits Tab */}
          <TabsContent value="credits" className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Unlimited chat with AI characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Generate stunning AI videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">HD quality exports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Priority processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">No watermarks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">Save 180 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-lg font-semibold mb-4">Monthly Subscription</h2>
              <Card className="border-primary relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500">⭐️ Limited Offer</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-1">Monthly Subscription</h3>
                    <p className="text-muted-foreground text-sm">100 Credits per month</p>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold">$29.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="line-through">$49.99</span>
                      <span className="text-primary font-semibold ml-2">-40% OFF</span>
                    </div>
                  </div>
                  <div className="mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>~10 short videos (≤30s)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>~5 HD videos (≤60s)</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handlePurchase("Monthly Subscription")}>
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Credit Packs (One-time)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl font-bold">50</div>
                    <div className="text-sm text-muted-foreground">Credits</div>
                    <div className="text-xl font-bold">$19.99</div>
                    <Button
                      onClick={() => handlePurchase("50 Credits")}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/50 relative">
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">
                    Popular
                  </Badge>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl font-bold">100</div>
                    <div className="text-sm text-muted-foreground">Credits</div>
                    <div className="text-xl font-bold">$29.99</div>
                    <div className="text-xs text-green-500">Save 25%</div>
                    <Button
                      onClick={() => handlePurchase("100 Credits")}
                      className="w-full"
                      size="sm"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl font-bold">200</div>
                    <div className="text-sm text-muted-foreground">Credits</div>
                    <div className="text-xl font-bold">$49.99</div>
                    <div className="text-xs text-green-500">Save 38%</div>
                    <Button
                      onClick={() => handlePurchase("200 Credits")}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <Badge className="mb-2" variant="secondary">Best Value</Badge>
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-2xl font-bold">500</div>
                    <div className="text-sm text-muted-foreground">Credits</div>
                    <div className="text-xl font-bold">$99.99</div>
                    <div className="text-xs text-green-500">Save 50%</div>
                    <Button
                      onClick={() => handlePurchase("500 Credits")}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-8">
              By subscribing, you agree to our{" "}
              <button className="underline">Terms of Service</button> and{" "}
              <button className="underline">Privacy Policy</button>
            </p>
          </TabsContent>
        </Tabs>

        <LoginPrompt
          open={showLoginPrompt}
          onOpenChange={setShowLoginPrompt}
          message="Please login to purchase."
        />
      </div>
    </div>
  );
};

export default Pricing;
