import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ArrowRight, Mail } from "lucide-react";

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/3843168/3843168-uhd_2560_1440_25fps.mp4";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80";

// Transition phases for the Screen 2 → Screen 3 bridge
type BgPhase = "cinematic" | "darkening" | "fading" | "light";

// Shared ghost button styles
const ghostDark = {
  base: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "white",
    borderRadius: "10px",
    height: "44px",
    padding: "0 28px",
    fontSize: "14px",
    fontWeight: 500 as const,
    cursor: "pointer",
    transition: "background 150ms, border-color 150ms",
  },
  onEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
  },
  onLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
  },
};

const ghostLight = {
  base: {
    background: "transparent",
    border: "1px solid rgba(0,0,0,0.15)",
    color: "#0F1729",
    borderRadius: "10px",
    height: "44px",
    padding: "0 28px",
    fontSize: "14px",
    fontWeight: 500 as const,
    cursor: "pointer",
    transition: "background 150ms",
  },
  onEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(0,0,0,0.03)";
  },
  onLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "transparent";
  },
};

// Stagger helper
const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] },
});

function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, exit: { duration: 0.2 } }}
      className="flex flex-col items-center text-center relative z-10"
    >
      {/* Logo */}
      <motion.div
        {...stagger(0)}
        className="flex items-center gap-2"
        style={{ marginBottom: "40px", color: "white" }}
      >
        <Building2 className="w-7 h-7" strokeWidth={2} />
        <span className="text-xl font-bold tracking-tight">REcollab</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...stagger(0.15)}
        style={{
          fontSize: "42px",
          fontWeight: 600,
          color: "white",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}
      >
        Welcome to REcollab.
      </motion.h1>

      {/* Subline */}
      <motion.p
        {...stagger(0.3)}
        className="mt-4"
        style={{ fontSize: "17px", fontWeight: 400, color: "rgba(255,255,255,0.65)" }}
      >
        The financial operating system for residential buildings.
      </motion.p>

      {/* Get started ghost button */}
      <motion.button
        {...stagger(0.5)}
        onClick={onContinue}
        className="mt-[52px] flex items-center justify-center"
        style={ghostDark.base}
        onMouseEnter={ghostDark.onEnter}
        onMouseLeave={ghostDark.onLeave}
      >
        Get started &rarr;
      </motion.button>
    </motion.div>
  );
}

function ValueScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      key="value"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, exit: { duration: 0.2 } }}
      className="flex flex-col items-center text-center relative z-10"
      style={{ maxWidth: 480 }}
    >
      {/* Line 1 */}
      <motion.p
        {...stagger(0)}
        style={{
          fontSize: "22px",
          fontWeight: 600,
          color: "white",
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
        }}
      >
        We turn your building's financial data into a living, intelligent plan.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.15)",
          margin: "24px 0",
        }}
      />

      {/* Line 2 */}
      <motion.p
        {...stagger(0.5)}
        style={{
          fontSize: "22px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
        }}
      >
        Reserve fund, compliance, capital projects. Connected and always up to date.
      </motion.p>

      {/* Continue ghost button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={onContinue}
        className="mt-[44px] flex items-center justify-center"
        style={ghostDark.base}
        onMouseEnter={ghostDark.onEnter}
        onMouseLeave={ghostDark.onLeave}
      >
        Continue &rarr;
      </motion.button>
    </motion.div>
  );
}

function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmittedEmail(email);
      setSubmitted(true);
      // Navigate after a brief pause so user sees the confirmation
      setTimeout(() => {
        navigate("/onboarding/profile", { state: { email } });
      }, 2500);
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    setSubmittedEmail("");
    setEmail("");
  };

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
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
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Heading */}
              <h2
                className="text-center"
                style={{ fontSize: "22px", fontWeight: 600, color: "#0F1729" }}
              >
                Create your account.
              </h2>
              <p
                className="text-center mt-2"
                style={{ fontSize: "14px", color: "#9CA3B8" }}
              >
                Enter your work email. We'll send you a verification link.
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
                  {/* Ghost submit button */}
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "transparent",
                      border: "1px solid rgba(0,0,0,0.15)",
                      cursor: "pointer",
                      transition: "background 150ms",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <ArrowRight className="w-4 h-4" style={{ color: "#0F1729" }} />
                  </button>
                </div>
              </form>

              {/* Google sign-up ghost button */}
              <button
                className="w-full flex items-center justify-center gap-2.5 mt-3"
                style={{
                  ...ghostLight.base,
                  height: "48px",
                  width: "100%",
                  padding: "0",
                }}
                onMouseEnter={ghostLight.onEnter}
                onMouseLeave={ghostLight.onLeave}
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>

              {/* Footer */}
              <p
                className="text-center mt-8"
                style={{ fontSize: "12px", color: "#9CA3B8" }}
              >
                Terms &middot; Privacy
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              {/* Envelope icon */}
              <Mail className="w-6 h-6" style={{ color: "#0F1729" }} strokeWidth={1.5} />

              {/* Heading */}
              <h2
                className="mt-4"
                style={{ fontSize: "22px", fontWeight: 600, color: "#0F1729" }}
              >
                Check your inbox.
              </h2>

              {/* Subline */}
              <p className="mt-3" style={{ fontSize: "14px", color: "#9CA3B8", lineHeight: 1.6 }}>
                We sent a verification link to
              </p>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#0F1729" }}>
                {submittedEmail}
              </p>

              {/* Back link */}
              <button
                onClick={handleBack}
                className="mt-8"
                style={{
                  fontSize: "13px",
                  color: "#9CA3B8",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
              >
                Back to sign up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [bgPhase, setBgPhase] = useState<BgPhase>("cinematic");
  const [videoFailed, setVideoFailed] = useState(false);

  // Orchestrated bridge: Screen 2 → Screen 3
  const startBridge = useCallback(() => {
    // Phase 1: darken the overlay (0ms)
    setBgPhase("darkening");
    // Phase 2: fade the video out (400ms in)
    setTimeout(() => setBgPhase("fading"), 400);
    // Phase 3: switch to light bg + show sign-up (700ms in)
    setTimeout(() => {
      setBgPhase("light");
      setScreen(3);
    }, 700);
  }, []);

  // Overlay opacity based on phase
  const overlayBg =
    bgPhase === "darkening" || bgPhase === "fading"
      ? "rgba(10, 14, 26, 0.85)"
      : "rgba(10, 14, 26, 0.55)";

  // Video container opacity
  const videoOpacity = bgPhase === "fading" ? 0 : 1;

  // Whether video layer is still in DOM
  const showVideo = bgPhase !== "light";

  // Page background color (behind everything)
  const pageBg =
    bgPhase === "light"
      ? "#F7F8FA"
      : bgPhase === "fading"
        ? "#F7F8FA"
        : "#0A0E1A";

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: pageBg,
        transition: "background 400ms ease",
      }}
    >
      {/* Video/image background — persists behind screens 1 & 2, bridges into 3 */}
      {showVideo && (
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: videoOpacity,
            transition: "opacity 300ms ease",
          }}
        >
          {/* Fallback static image — always present behind video */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${FALLBACK_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Video — hidden if it errors */}
          {!videoFailed && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={VIDEO_SRC}
              onError={() => setVideoFailed(true)}
            />
          )}
          {/* Dark overlay — animates darker during bridge */}
          <div
            className="absolute inset-0"
            style={{
              background: overlayBg,
              transition: "background 400ms ease",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5">
        <div className="w-full flex items-center justify-center" style={{ maxWidth: screen === 2 ? 560 : 480 }}>
          <AnimatePresence mode="wait">
            {screen === 1 && <WelcomeScreen key="welcome" onContinue={() => setScreen(2)} />}
            {screen === 2 && <ValueScreen key="value" onContinue={startBridge} />}
            {screen === 3 && <SignUpScreen key="signup" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
