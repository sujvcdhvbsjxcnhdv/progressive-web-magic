import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = async () => {
    if (!email) {
      setEmailError("A valid email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("A valid email is required");
      return;
    }
    setEmailError("");
    setSendingCode(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      setCodeSent(true);
      toast({
        title: "Code Sent",
        description: "Check your email for the verification code.",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSendingCode(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setEmailError("A valid email is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would verify the code with your backend
      // For demo, we'll use Supabase's updateUser after code verification
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password reset successfully!",
        duration: 3000,
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Reset Password</h1>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={emailError ? "border-destructive" : ""}
            />
            {emailError && (
              <p className="text-destructive text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="verificationCode">Verification Code</Label>
            <div className="flex gap-2">
              <Input
                id="verificationCode"
                type="text"
                placeholder=""
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleSendCode}
                disabled={sendingCode}
                className="bg-primary/80 hover:bg-primary px-4"
              >
                {sendingCode ? "..." : "Send"}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 h-12 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset Password"}
          </Button>

          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="w-full text-center text-primary hover:underline text-sm"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-muted-foreground text-xs mt-6">
          By continuing you agree to our{" "}
          <span className="text-primary cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-primary cursor-pointer">Privacy Policy</span>
        </p>
      </Card>
    </div>
  );
};

export default ForgotPassword;
