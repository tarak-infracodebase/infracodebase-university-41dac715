import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GRADIENT_BG = "linear-gradient(135deg, #c2410c 0%, #d97706 30%, #ca8a04 50%, #16a34a 72%, #0891b2 100%)";

const questions = [
  {
    question: "What's your experience with cloud infrastructure?",
    options: [
      "No experience yet",
      "Some hands-on experience (AWS, Azure or GCP)",
      "I work with cloud daily",
    ],
  },
  {
    question: "Have you used Infrastructure as Code before?",
    options: [
      "Not yet",
      "I've tried it (Terraform, Bicep, CloudFormation, Pulumi)",
      "Yes, regularly",
    ],
  },
  {
    question: "What are you trying to achieve with Infracodebase?",
    options: [
      "Build a solid foundation",
      "Deploy production infrastructure",
      "Govern a team's infrastructure",
      "Migrate existing workloads",
    ],
  },
];

function getFramingMessage(answers: number[]): { heading: string; body: string } {
  const exp = answers[0] ?? 0;
  if (exp === 0) {
    return {
      heading: "Start from the beginning",
      body: "We recommend starting with the Introduction track. It will orient you to the program structure, set up your learning environment, and give you a clear path through the prerequisites before diving into hands-on infrastructure.",
    };
  }
  if (exp === 1) {
    return {
      heading: "You have a head start",
      body: "Since you already have some cloud experience, the Introduction track will help you map what you know to the Infracodebase framework. You will move through the prerequisites quickly and be ready for the core curriculum sooner.",
    };
  }
  return {
    heading: "Sharpen your edge",
    body: "You work with cloud daily, so the Introduction track will be a fast orientation. Use it to identify any gaps in your fundamentals before moving into the advanced tracks where the real challenge begins.",
  };
}

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
}

export function CurriculumGuidanceQuiz({ open, onClose }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  const currentQ = questions[step];
  const selectedAnswer = answers[step] ?? -1;
  const progress = showResult ? 100 : ((step + 1) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleGo = () => {
    onClose();
    navigate("/path/cloud-infrastructure-intro");
  };

  const framing = getFramingMessage(answers);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-xl border border-border bg-background p-4 sm:p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
          <X className="h-4 w-4" />
        </button>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {showResult ? "Your recommendation" : `Question ${step + 1} of ${questions.length}`}
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: GRADIENT_BG }}
            />
          </div>
        </div>

        {showResult ? (
          <div>
            <h2 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">{framing.heading}</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">{framing.body}</p>
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="px-4 py-2.5 rounded-lg text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                Back
              </button>
              <button
                onClick={handleGo}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: GRADIENT_BG }}
              >
                Start the Introduction
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-base font-bold text-[hsl(var(--foreground))] mb-4">{currentQ.question}</h2>
            <div className="space-y-2 mb-6">
              {currentQ.options.map((opt, i) => (
                <label
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`relative z-10 flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswer === i
                      ? "border-[#d97706]/60 bg-[#d97706]/5"
                      : "border-border hover:border-muted-foreground/40"
                  }`}
                >
                  <span
                    className={`shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedAnswer === i ? "border-[#d97706]" : "border-[#444]"
                    }`}
                  >
                    {selectedAnswer === i && (
                      <span className="h-2 w-2 rounded-full bg-[#d97706]" />
                    )}
                  </span>
                  <span className="text-sm text-[hsl(var(--foreground))]">{opt}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {step > 0 && (
                <button onClick={handleBack} className="px-4 py-2.5 rounded-lg text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={selectedAnswer === -1}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: GRADIENT_BG }}
              >
                {step < questions.length - 1 ? "Next" : "See recommendation"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
