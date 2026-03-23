import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AuthGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthGateModal = ({ open, onOpenChange }: AuthGateModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/50 bg-card">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-lg font-bold">Sign in to continue</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Create a free account to save your progress, submit work, and earn XP.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          <Button
            onClick={() => { onOpenChange(false); navigate("/sign-in"); }}
            className="w-full gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </Button>
          <Button
            variant="outline"
            onClick={() => { onOpenChange(false); navigate("/sign-up"); }}
            className="w-full gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Create free account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthGateModal;
