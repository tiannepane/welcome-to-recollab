import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate("/onboarding/profile", { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 onboarding-glow">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-[400px] flex flex-col items-center"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <Building2 className="w-6 h-6 text-foreground" strokeWidth={1.8} />
          <span className="text-xl text-foreground" style={{ fontWeight: 500, letterSpacing: "-0.025em" }}>REcollab</span>
        </div>

        {/* Heading */}
        <h1 className="heading-lg text-center mb-2">Welcome to REcollab</h1>
        <p className="text-muted-foreground text-center mb-10">
          The financial operating system for asset managers.
        </p>

        {/* Email input with embedded arrow */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-pill"
              required
            />
            <button type="submit" className="input-arrow">
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </form>

        {/* Google */}
        <button className="btn-ghost-pill mt-3">
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-[13px] text-muted-foreground mt-10">
          Terms · Privacy
        </p>
      </motion.div>
    </div>
  );
}
