import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

const screenTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
};

function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      {...screenTransition}
      className="flex flex-col items-center text-center"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <Building2 className="w-6 h-6" style={{ color: "#0F1729" }} strokeWidth={2} />
        <span className="text-xl font-bold tracking-tight" style={{ color: "#0F1729" }}>
          REcollab
        </span>
      </div>

      {/* Headline */}
      <h1
        className="leading-tight tracking-tight"
        style={{ fontSize: "36px", fontWeight: 600, color: "#0F1729" }}
      >
        Welcome to REcollab.
      </h1>

      {/* Subline */}
      <p className="mt-4" style={{ fontSize: "16px", color: "#5A6178" }}>
        The financial operating system for residential buildings.
      </p>

      {/* Get started link */}
      <button
        onClick={onContinue}
        className="mt-12 hover:underline transition-all"
        style={{ fontSize: "14px", fontWeight: 500, color: "#0F1729", background: "none", border: "none", cursor: "pointer" }}
      >
        Get started &rarr;
      </button>
    </motion.div>
  );
}

function ValueScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      {...screenTransition}
      className="flex flex-col items-center text-center"
      style={{ maxWidth: 400 }}
    >
      {/* First statement */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0 }}
        style={{ fontSize: "20px", fontWeight: 500, color: "#0F1729", lineHeight: 1.5 }}
      >
        We turn your building's financial data into a living, intelligent plan.
      </motion.p>

      {/* Second statement */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-6"
        style={{ fontSize: "20px", fontWeight: 500, color: "#5A6178", lineHeight: 1.5 }}
      >
        Reserve fund, compliance, capital projects. Connected and always up to date.
      </motion.p>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.8 }}
        onClick={onContinue}
        className="mt-12 flex items-center justify-center gap-2"
        style={{
          background: "#0F1729",
          color: "white",
          borderRadius: "10px",
          height: "44px",
          padding: "0 28px",
          fontSize: "15px",
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
        }}
        whileHover={{ background: "#1a2640" }}
      >
        Continue &rarr;
      </motion.button>
    </motion.div>
  );
}

function SignInScreen() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate("/onboarding/profile", { state: { email } });
    }
  };

  return (
    <motion.div
      {...screenTransition}
      className="w-full"
      style={{ maxWidth: 480 }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          boxShadow: "0 8px 48px rgba(0, 0, 0, 0.07)",
          padding: "48px",
        }}
      >
        {/* Heading */}
        <h2
          className="text-center"
          style={{ fontSize: "22px", fontWeight: 600, color: "#0F1729" }}
        >
          Sign in to REcollab
        </h2>
        <p
          className="text-center mt-2"
          style={{ fontSize: "14px", color: "#9CA3B8" }}
        >
          Enter your work email to continue.
        </p>

        {/* Email input */}
        <form onSubmit={handleSubmit} className="mt-7">
          <div className="relative">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pr-14 focus:outline-none"
              style={{
                height: "48px",
                padding: "0 16px",
                paddingRight: "56px",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "10px",
                fontSize: "15px",
                color: "#0F1729",
                transition: "all 150ms",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#0F1729";
                e.currentTarget.style.background = "white";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                e.currentTarget.style.background = "rgba(0,0,0,0.03)";
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#0F1729",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>

        {/* Google sign-in */}
        <button
          className="w-full flex items-center justify-center gap-2.5 mt-3"
          style={{
            height: "48px",
            background: "white",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#0F1729",
            cursor: "pointer",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Footer */}
        <p
          className="text-center mt-8"
          style={{ fontSize: "12px", color: "#9CA3B8" }}
        >
          Terms &middot; Privacy
        </p>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "#F7F8FA" }}
    >
      <div className="w-full flex items-center justify-center" style={{ maxWidth: 480 }}>
        <AnimatePresence mode="wait">
          {screen === 1 && <WelcomeScreen key="welcome" onContinue={() => setScreen(2)} />}
          {screen === 2 && <ValueScreen key="value" onContinue={() => setScreen(3)} />}
          {screen === 3 && <SignInScreen key="signin" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
