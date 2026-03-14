import { FeedbackModal } from "@/components/FeedbackModal";
import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState } from "react";

const FeedbackPage = () => {
  const [open, setOpen] = useState(true);
  
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Feedback</h1>
          <p className="text-sm text-muted-foreground">Help us improve Infracodebase University</p>
        </div>
        <button onClick={() => setOpen(true)} className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Send Feedback
        </button>
        <FeedbackModal open={open} onClose={() => setOpen(false)} />
      </div>
    </AppLayout>
  );
};

export default FeedbackPage;
