import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Menu, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";
import AppSidebar from "@/components/AppSidebar";
import UserAvatarMenu from "@/components/UserAvatarMenu";

// Membership tier types: 'none' | 'basic' | 'plus' | 'pro'
type MembershipTier = 'none' | 'basic' | 'plus' | 'pro';

const getMembershipBadge = (tier: MembershipTier) => {
  switch (tier) {
    case 'basic':
      return { text: 'PRO', className: 'bg-purple-600 text-white' };
    case 'plus':
      return { text: 'PRO', className: 'bg-pink-500 text-white' };
    case 'pro':
      return { text: 'PRO', className: 'bg-amber-500 text-black' };
    default:
      return null;
  }
};

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("premium");
  const [membershipTier, setMembershipTier] = useState<MembershipTier>(user ? 'none' : 'none');
  const [isVideoMember, setIsVideoMember] = useState(false);
  
  // Get the main tab from URL query parameter
  const tabParam = searchParams.get("tab");
  const defaultMainTab = tabParam === "video" ? "credits" : "chat";
  const [mainTab, setMainTab] = useState(defaultMainTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "video") {
      setMainTab("credits");
    } else if (tab === "chat") {
      setMainTab("chat");
    }
  }, [searchParams]);
  
  const membershipBadge = getMembershipBadge(membershipTier);

  const handlePurchase = (plan: string, tierId?: string) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    toast.success(`Redirecting to payment for ${plan}...`);
    setTimeout(() => {
      toast.success("Payment successful!");
      // Update membership tier based on purchased plan
      if (tierId === 'basic') setMembershipTier('basic');
      else if (tierId === 'premium') setMembershipTier('plus');
      else if (tierId === 'ultimate') setMembershipTier('pro');
    }, 2000);
  };

  const chatPlans = [
    {
      id: "free",
      tab: "Free",
      title: "Free Trial",
      subtitle: "Characters won't remember much",
      price: "$0",
      period: "",
      features: [
        "20 Daily Messages",
        "Limited Characters",
        "Standard Speed"
      ],
      cardStyle: "bg-gradient-to-br from-secondary/80 to-secondary border-border",
      iconBg: "bg-gradient-to-br from-gray-600 to-gray-800"
    },
    {
      id: "basic",
      tab: "Basic",
      title: "Basic",
      subtitle: "Spark a casual connection",
      price: "$5.99",
      period: " / Month",
      features: [
        "100 Daily Messages",
        "Unlock All Characters",
        "Standard Memory (100 msgs)",
        "Standard Speed"
      ],
      cardStyle: "bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-purple-500/30",
      iconBg: "bg-gradient-to-br from-purple-600 to-purple-900"
    },
    {
      id: "premium",
      tab: "Premium",
      title: "Plus",
      subtitle: "Unlimited intimacy & chat",
      price: "$14.99",
      period: " / Month",
      tag: "🔥 Most Popular",
      features: [
        "Unlimited Messages",
        "Long-term Memory (400 msgs)",
        "Fast Response Speed",
        "Priority Access"
      ],
      cardStyle: "bg-gradient-to-br from-[#1a1a2e] to-[#2d1b4e] border-purple-500/50",
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600"
    },
    {
      id: "ultimate",
      tab: "Ultimate",
      title: "Pro Yearly",
      subtitle: "Deep memory, true soulmate.",
      price: "$4.99",
      period: " / Month",
      tag: "💰 Save 60%",
      yearlyNote: "Billed $58.88 / year",
      features: [
        "Unlimited Messages",
        "Deep Memory (1000 msgs)",
        "Max Response Speed",
        "VIP Customer Support"
      ],
      cardStyle: "bg-gradient-to-br from-[#2a1810] to-[#1a1a0e] border-amber-500/50",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-700"
    }
  ];

  const currentPlan = chatPlans.find(p => p.id === activeTab) || chatPlans[2];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {membershipBadge && (
              <Badge className={`text-xs px-2 py-0.5 ${membershipBadge.className}`}>
                {membershipBadge.text}
              </Badge>
            )}
            <div className="flex items-center gap-1 bg-secondary rounded-full px-2 py-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium">151</span>
            </div>
            {user ? (
              <UserAvatarMenu />
            ) : (
              <Button 
                size="sm" 
                className="h-7 text-xs px-3"
                onClick={() => setShowLoginPrompt(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Main Tabs: Chat vs Video Credits */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <div className="flex justify-center mb-4">
            <TabsList className="bg-secondary/50 p-1 rounded-full">
              <TabsTrigger 
                value="chat" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="credits" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Video Credits
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Chat Plans Tab */}
          <TabsContent value="chat" className="space-y-4">
            {/* Plan Tabs */}
            <div className="flex justify-center">
              <div className="flex gap-4 text-sm">
                {chatPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setActiveTab(plan.id)}
                    className={`pb-2 transition-colors ${
                      activeTab === plan.id
                        ? plan.id === "ultimate" 
                          ? "text-amber-400 border-b-2 border-amber-400 font-semibold"
                          : "text-primary border-b-2 border-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Card */}
            <div className="flex justify-center">
              <div className={`w-full max-w-sm rounded-2xl border p-5 ${currentPlan.cardStyle}`}>
                {currentPlan.tag && (
                  <Badge className={`mb-3 ${
                    currentPlan.id === "ultimate" 
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}>
                    {currentPlan.tag}
                  </Badge>
                )}
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${currentPlan.iconBg} flex items-center justify-center mb-4`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 className={`text-xl font-bold mb-1 ${
                  currentPlan.id === "ultimate" ? "text-amber-400" : "text-foreground"
                }`}>
                  {currentPlan.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{currentPlan.subtitle}</p>

                <div className="mb-4">
                  <span className={`text-3xl font-bold ${
                    currentPlan.id === "ultimate" ? "text-amber-400" : "text-foreground"
                  }`}>
                    {currentPlan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{currentPlan.period}</span>
                </div>

                <div className="space-y-2.5 mb-6">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${
                        currentPlan.id === "ultimate" ? "text-amber-400" : "text-primary"
                      }`} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {currentPlan.id !== "free" && (
                  <>
                    <Button 
                      className={`w-full rounded-full h-12 font-semibold ${
                        currentPlan.id === "ultimate"
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                      onClick={() => handlePurchase(currentPlan.title, currentPlan.id)}
                    >
                      Subscribe
                    </Button>
                    <p className="text-center text-muted-foreground text-xs mt-2">Cancel anytime</p>
                    {currentPlan.yearlyNote && (
                      <p className="text-center text-muted-foreground text-xs mt-1">
                        {currentPlan.yearlyNote}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Video Credits Tab */}
          <TabsContent value="credits" className="space-y-6">
            {/* What You Get Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span>✨</span> What You Get
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span><strong>Pro-Speed</strong> Video Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span><strong>HD Quality</strong> & No Watermarks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span><strong>Exclusive Styles</strong> & Trends Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Get <strong>500</strong> weekly credits</span>
                </div>
              </div>
            </div>

            {/* Show different order based on video membership */}
            {isVideoMember ? (
              <>
                {/* Credit Packs First for Video Members */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Credit Packs (One-time)</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Large", credits: 1500, price: "$17.99", originalPrice: "$35.99", save: "50%", popular: true },
                      { name: "Small", credits: 300, price: "$3.99", originalPrice: null, save: null },
                      { name: "Medium", credits: 700, price: "$8.99", originalPrice: null, save: null },
                      { name: "Best Value", credits: 3500, price: "$34.99", originalPrice: "$174.99", save: "80%", best: true }
                    ].map((pack) => (
                      <div
                        key={pack.credits}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          pack.best ? "border-amber-500/50 bg-amber-500/10" : 
                          pack.popular ? "border-primary/50 bg-primary/10" : "border-border bg-secondary/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {(pack.popular || pack.best) && (
                            <Badge className={`text-xs ${pack.best ? "bg-amber-500 text-black" : "bg-red-500 text-white"}`}>
                              {pack.best ? "Best Value" : "🔥 Popular"}
                            </Badge>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              <span className="font-bold">{pack.credits}</span>
                              <span className="text-sm text-muted-foreground">Credits</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-semibold">{pack.price}</span>
                              {pack.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">{pack.originalPrice}</span>
                              )}
                              {pack.save && (
                                <span className="text-xs text-green-500 font-medium">Save {pack.save}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handlePurchase(`${pack.credits} Credits`)}
                          variant="outline"
                          size="sm"
                          className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                        >
                          Buy Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Subscription */}
                <div className="bg-secondary/30 rounded-2xl p-4 border border-border relative">
                  <Badge className="absolute -top-2 left-4 bg-red-500 text-white text-xs">
                    🔥 Limited Offer
                  </Badge>
                  <div className="absolute -top-2 right-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-lg font-bold transform rotate-12">
                    50% OFF
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-lg">Weekly Subscription</h4>
                    <p className="text-sm text-muted-foreground">500 Credits per week</p>
                    <div className="mt-3">
                      <span className="text-2xl font-bold">$3.99</span>
                      <span className="text-muted-foreground text-sm">/week</span>
                      <span className="text-muted-foreground text-sm line-through ml-2">$7.99</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Weekly Subscription First for Non-Video Members */}
                <div className="bg-secondary/30 rounded-2xl p-4 border border-border relative">
                  <Badge className="absolute -top-2 left-4 bg-red-500 text-white text-xs">
                    🔥 Limited Offer
                  </Badge>
                  <div className="absolute -top-2 right-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-lg font-bold transform rotate-12">
                    50% OFF
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-lg">Weekly Subscription</h4>
                    <p className="text-sm text-muted-foreground">500 Credits per week</p>
                    <div className="mt-3">
                      <span className="text-2xl font-bold">$3.99</span>
                      <span className="text-muted-foreground text-sm">/week</span>
                      <span className="text-muted-foreground text-sm line-through ml-2">$7.99</span>
                    </div>
                  </div>
                </div>

                {/* Credit Packs */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Credit Packs (One-time)</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Large", credits: 1500, price: "$17.99", originalPrice: "$35.99", save: "50%", popular: true },
                      { name: "Small", credits: 300, price: "$3.99", originalPrice: null, save: null },
                      { name: "Medium", credits: 700, price: "$8.99", originalPrice: null, save: null },
                      { name: "Best Value", credits: 3500, price: "$34.99", originalPrice: "$174.99", save: "80%", best: true }
                    ].map((pack) => (
                      <div
                        key={pack.credits}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          pack.best ? "border-amber-500/50 bg-amber-500/10" : 
                          pack.popular ? "border-primary/50 bg-primary/10" : "border-border bg-secondary/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {(pack.popular || pack.best) && (
                            <Badge className={`text-xs ${pack.best ? "bg-amber-500 text-black" : "bg-red-500 text-white"}`}>
                              {pack.best ? "Best Value" : "🔥 Popular"}
                            </Badge>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              <span className="font-bold">{pack.credits}</span>
                              <span className="text-sm text-muted-foreground">Credits</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-semibold">{pack.price}</span>
                              {pack.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">{pack.originalPrice}</span>
                              )}
                              {pack.save && (
                                <span className="text-xs text-green-500 font-medium">Save {pack.save}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handlePurchase(`${pack.credits} Credits`)}
                          variant="outline"
                          size="sm"
                          className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                        >
                          Buy Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Subscribe Button */}
            <Button 
              className="w-full rounded-full h-12 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                handlePurchase("Weekly Subscription");
                setIsVideoMember(true);
              }}
            >
              Subscribe
            </Button>
            <p className="text-center text-muted-foreground text-xs">Cancel anytime</p>
          </TabsContent>
        </Tabs>
      </div>

      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message="Please login to purchase."
      />
    </div>
  );
};

export default Pricing;
