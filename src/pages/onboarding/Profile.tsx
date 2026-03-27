import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = (location.state as any)?.email || "you@company.com";
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      navigate("/onboarding/company", { state: { email: passedEmail, name } });
    }
  };

  return (
    <OnboardingLayout currentStep={1}>
      <h1 className="heading-md mb-2">Let's start with you.</h1>
      <p className="text-[15px] font-normal mb-10" style={{ color: "#5A6178" }}>We just need a few basics.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Cooper"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pill-input"
            required
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            value={passedEmail}
            disabled
            className="pill-input opacity-50 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full h-12 rounded-[10px] bg-[#0F1729] text-white text-[15px] font-medium hover:bg-[#1a2640] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </OnboardingLayout>
  );
}
