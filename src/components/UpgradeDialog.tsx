import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PlanInfo {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  dailyMessages: string;
  chatMemory: string;
  characters: string;
  responseSpeed: string;
  period: string;
  daysInPeriod: number;
}

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: PlanInfo | null;
  newPlan: PlanInfo | null;
  remainingDays: number;
  onConfirm: () => void;
}

const UpgradeDialog = ({
  open,
  onOpenChange,
  currentPlan,
  newPlan,
  remainingDays,
  onConfirm,
}: UpgradeDialogProps) => {
  if (!currentPlan || !newPlan) return null;

  // Calculate prorated refund from current plan
  const dailyRate = currentPlan.price / currentPlan.daysInPeriod;
  const remainingValue = dailyRate * remainingDays;
  const proratedPayment = Math.max(0, newPlan.price - remainingValue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Upgrade Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Plan */}
          <div>
            <h4 className="text-primary font-semibold mb-2">Current Plan</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span>{currentPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span>{currentPlan.priceLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Messages</span>
                <span>{currentPlan.dailyMessages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chat Memory</span>
                <span>{currentPlan.chatMemory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters</span>
                <span>{currentPlan.characters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response Speed</span>
                <span>{currentPlan.responseSpeed}</span>
              </div>
            </div>
          </div>

          {/* New Plan */}
          <div>
            <h4 className="text-primary font-semibold mb-2">New Plan</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span>{newPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span>{newPlan.priceLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Messages</span>
                <span>{newPlan.dailyMessages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chat Memory</span>
                <span>{newPlan.chatMemory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters</span>
                <span>{newPlan.characters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response Speed</span>
                <span>{newPlan.responseSpeed}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Payment Summary</h4>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Immediate Payment</span>
              <span className="text-primary font-bold text-lg">
                ${proratedPayment.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Upgrade will cost ${proratedPayment.toFixed(2)} (prorated)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 rounded-full"
              onClick={onConfirm}
            >
              Confirm Upgrade
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
