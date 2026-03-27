import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Building2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const STEPS = [
  "Your Profile",
  "Company Info",
  "Portfolio Size",
  "Building Types",
  "Reserve Studies",
  "Financial Goals",
  "Team Members",
  "Integrations",
  "Review & Launch",
];

const TIPS: Record<number, string> = {
  1: "Buildings with complete profiles receive 40% more accurate reserve projections.",
  2: "Knowing your role helps us tailor reports and alerts to what matters most.",
  3: "Portfolio size helps us optimize your dashboard layout and reporting cadence.",
  4: "Different building types have different reserve fund requirements and lifecycles.",
  5: "Importing existing studies saves an average of 12 hours of manual data entry.",
  6: "Clear financial goals help us surface the most relevant insights and alerts.",
  7: "Teams using REcollab together see 3x faster reserve study completion.",
  8: "Integrations reduce duplicate data entry and keep your records in sync.",
  9: "You're almost there! Review your setup before launching your workspace.",
};

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
}

function StepIndicator({ step, currentStep }: { step: number; currentStep: number }) {
  const isCompleted = step < currentStep;
  const isCurrent = step === currentStep;

  if (isCompleted) {
    return (
      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
      </div>
    );
  }
  if (isCurrent) {
    return (
      <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-foreground" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
    </div>
  );
}

function DesktopSidebar({ currentStep }: { currentStep: number }) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] flex-col bg-background border-r border-[hsl(0,0%,91%)] z-10">
      <div className="px-6 pt-7 pb-8 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-foreground" strokeWidth={2} />
        <span className="text-[17px] font-medium tracking-tight text-foreground" style={{ fontWeight: 500 }}>REcollab</span>
      </div>

      <nav className="flex-1 px-6">
        <ul className="space-y-1">
          {STEPS.map((label, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
              <li key={step} className="flex items-center gap-3 py-[7px]">
                <StepIndicator step={step} currentStep={currentStep} />
                <span
                  className={`text-[13.5px] leading-none ${
                    isCurrent
                      ? "font-medium text-foreground"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      {TIPS[currentStep] && (
        <div className="px-6 pb-6">
          <div className="border border-input rounded-xl p-4">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-1.5">
              Tip
            </p>
            <p className="text-[13px] leading-[1.5] text-muted-foreground">
              {TIPS[currentStep]}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

function MobileTopBar({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep - 1) / STEPS.length) * 100;
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-background z-20">
      <div className="h-[2px] bg-muted">
        <div
          className="h-full bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-foreground" strokeWidth={2} />
          <span className="text-[14px] font-medium text-foreground">REcollab</span>
        </div>
        <span className="text-[13px] text-muted-foreground">{STEPS[currentStep - 1]}</span>
      </div>
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(0px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -4, filter: "blur(4px)" },
};

export default function OnboardingLayout({ children, currentStep }: OnboardingLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar currentStep={currentStep} />
      <MobileTopBar currentStep={currentStep} />

      <div className="md:ml-[260px] min-h-screen flex items-center justify-center px-5 py-16 md:py-8 onboarding-glow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-[440px]"
          >
            <p className="text-[13px] text-muted-foreground mb-5">
              Step {currentStep} of {STEPS.length}
            </p>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
