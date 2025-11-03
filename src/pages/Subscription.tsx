import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { toast } from "sonner";

const Subscription = () => {
  const handlePurchase = (plan: string) => {
    toast.success(`${plan} selected! Redirecting to payment...`);
  };

  const benefits = [
    "Unlimited AI chat conversations",
    "Priority video generation",
    "Access to exclusive AI characters",
    "Higher quality video outputs",
    "No watermarks",
    "Early access to new features",
  ];

  const creditPacks = [
    { credits: 200, price: 4, popular: false },
    { credits: 650, price: 8.99, popular: true },
    { credits: 1500, price: 17.99, popular: false },
    { credits: 3500, price: 34.99, popular: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">Unlock unlimited possibilities</p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Premium Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Weekly Plan
              </CardTitle>
              <Badge className="absolute top-4 right-4" variant="secondary">
                First week $0.99
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold">$9.99</div>
                <div className="text-sm text-muted-foreground">per week</div>
              </div>
              <Button onClick={() => handlePurchase("Weekly Plan")} className="w-full">
                Subscribe Weekly
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Auto-renews weekly. Cancel anytime.
              </p>
            </CardContent>
          </Card>

          <Card className="relative border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Annual Plan
              </CardTitle>
              <Badge className="absolute top-4 right-4">Best Value</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold">$39.99</div>
                <div className="text-sm text-muted-foreground">per year</div>
                <div className="text-xs text-primary">Save $79 per year</div>
              </div>
              <Button onClick={() => handlePurchase("Annual Plan")} className="w-full">
                Subscribe Annually
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Auto-renews yearly. Cancel anytime.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Credit Packs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {creditPacks.map((pack) => (
              <Card
                key={pack.credits}
                className={pack.popular ? "border-primary/50 relative" : ""}
              >
                {pack.popular && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                    Popular
                  </Badge>
                )}
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="text-2xl font-bold">{pack.credits}</div>
                  <div className="text-sm text-muted-foreground">Credits</div>
                  <div className="text-xl font-bold">${pack.price}</div>
                  <Button
                    onClick={() => handlePurchase(`${pack.credits} Credits`)}
                    variant={pack.popular ? "default" : "outline"}
                    className="w-full"
                    size="sm"
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          By subscribing, you agree to our{" "}
          <button className="underline">Terms of Service</button> and{" "}
          <button className="underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default Subscription;
