import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Building2 } from "lucide-react";

const STEPS = [
  "Your Profile",
  "Company Info",
  "Building Name",
  "Address",
  "Building Details",
  "Building History",
  "Anything Else",
  "Complete",
];

const TIPS: Record<number, string> = {
  1: "Buildings with complete profiles receive 40% more accurate reserve projections.",
  2: "Knowing your role helps us tailor reports and alerts to what matters most.",
  3: "Portfolio size helps us optimize your dashboard layout and reporting cadence.",
  4: "Different building types have different reserve fund requirements and lifecycles.",
  5: "Importing existing studies saves an average of 12 hours of manual data entry.",
  6: "Clear financial goals help us surface the most relevant insights and alerts.",
  7: "Almost there. Share anything that helps us tailor your experience.",
};

// Ghost preview shapes per step — represents what the NEXT step's form looks like
const GHOST_PREVIEWS: Record<number, ReactNode> = {
  1: ( // Next: Company — input + 2x2 role grid + button
    <div className="space-y-5">
      <div className="h-5 w-24 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-5 w-16 rounded bg-current" />
      <div className="grid grid-cols-2 gap-2.5">
        <div className="h-11 rounded-[10px] bg-current" />
        <div className="h-11 rounded-[10px] bg-current" />
        <div className="h-11 rounded-[10px] bg-current" />
        <div className="h-11 rounded-[10px] bg-current" />
      </div>
      <div className="h-12 w-full rounded-[10px] bg-current" />
    </div>
  ),
  2: ( // Next: BuildingName — single input
    <div className="space-y-5">
      <div className="h-7 w-48 rounded bg-current" />
      <div className="h-5 w-64 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
    </div>
  ),
  3: ( // Next: Address — street, city, country, region
    <div className="space-y-4">
      <div className="h-5 w-28 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-5 w-12 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-5 w-20 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
    </div>
  ),
  4: ( // Next: BuildingDetails — select + inputs
    <div className="space-y-4">
      <div className="h-5 w-40 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-5 w-32 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-5 w-28 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
    </div>
  ),
  5: ( // Next: BuildingHistory — select + 2 selects row + textarea
    <div className="space-y-4">
      <div className="h-5 w-20 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
      <div className="h-5 w-48 rounded bg-current" />
      <div className="grid grid-cols-2 gap-2.5">
        <div className="h-12 rounded-[10px] bg-current" />
        <div className="h-12 rounded-[10px] bg-current" />
      </div>
      <div className="h-5 w-44 rounded bg-current" />
      <div className="h-20 w-full rounded-[10px] bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
    </div>
  ),
  6: ( // Next: AnythingElse — textarea
    <div className="space-y-5">
      <div className="h-7 w-64 rounded bg-current" />
      <div className="h-5 w-56 rounded bg-current" />
      <div className="h-32 w-full rounded-[10px] bg-current" />
    </div>
  ),
  7: ( // Next: Complete — checkmark + text
    <div className="flex flex-col items-center space-y-5 pt-8">
      <div className="w-20 h-20 rounded-full bg-current" />
      <div className="h-7 w-40 rounded bg-current" />
      <div className="h-5 w-56 rounded bg-current" />
      <div className="h-12 w-full rounded-[10px] bg-current" />
    </div>
  ),
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
      <div className="w-5 h-5 rounded-full bg-[#0F1729] flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (isCurrent) {
    return (
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#0F1729]" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
      <div className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB]" />
    </div>
  );
}

function DesktopSidebar({ currentStep }: { currentStep: number }) {
  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] flex-col z-10"
      style={{
        background: "rgba(248, 249, 251, 0.8)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-8 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-foreground" strokeWidth={2} />
        <span className="text-[17px] font-bold tracking-tight text-foreground">REcollab</span>
      </div>

      {/* Steps */}
      <nav className="flex-1 px-6">
        <ul className="space-y-1">
          {STEPS.map((label, i) => {
            const step = i + 1;
            const isCurrent = step === currentStep;
            const isCompleted = step < currentStep;
            return (
              <li key={step} className="flex items-center gap-3 py-[7px]">
                <StepIndicator step={step} currentStep={currentStep} />
                <span
                  className={`text-[13px] leading-none ${
                    isCurrent
                      ? "font-semibold"
                      : ""
                  }`}
                  style={{
                    color: isCurrent || isCompleted ? "#0F1729" : "#9CA3B8",
                  }}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tip */}
      {TIPS[currentStep] && (
        <div className="px-6 pb-6">
          <div
            className="px-4 py-3.5"
            style={{
              background: "rgba(0,0,0,0.03)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "10px",
            }}
          >
            <p className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: "#9CA3B8" }}>
              Tip
            </p>
            <p className="text-[13px] leading-[1.45]" style={{ color: "#9CA3B8" }}>
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
    <div
      className="md:hidden fixed top-0 left-0 right-0 z-20"
      style={{
        background: "rgba(247, 248, 250, 0.8)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="h-[3px] bg-muted">
        <div
          className="h-full bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-foreground" strokeWidth={2} />
          <span className="text-[14px] font-bold text-foreground">REcollab</span>
        </div>
        <span className="text-[13px]" style={{ color: "#9CA3B8" }}>{STEPS[currentStep - 1]}</span>
      </div>
    </div>
  );
}

function GhostPreview({ currentStep }: { currentStep: number }) {
  const ghost = GHOST_PREVIEWS[currentStep];
  if (!ghost) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="w-full max-w-[520px] px-12 text-black"
          style={{
            opacity: 0.12,
            filter: "blur(18px)",
            transform: "scale(1.1)",
          }}
        >
          {ghost}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function OnboardingLayout({ children, currentStep }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen onboarding-bg">
      <DesktopSidebar currentStep={currentStep} />
      <MobileTopBar currentStep={currentStep} />

      <div className="md:ml-[260px] min-h-screen flex items-center justify-center px-5 py-16 md:py-8 relative">
        {/* Ghost preview background */}
        <GhostPreview currentStep={currentStep} />

        {/* Floating card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
              exit: { duration: 0.2 },
              delay: 0.05,
            }}
            className="w-full max-w-[520px] relative"
            style={{ zIndex: 1 }}
          >
            <div
              className="w-full"
              style={{
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                borderRadius: "20px",
                boxShadow: "0 8px 48px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.04)",
                padding: "48px",
              }}
            >
              <p
                className="mb-6"
                style={{
                  fontSize: "12px",
                  color: "#9CA3B8",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Step {currentStep} of {STEPS.length}
              </p>
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
