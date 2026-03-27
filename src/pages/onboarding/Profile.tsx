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
      <p className="text-muted-foreground mb-10">We just need a few basics.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2 ml-1">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Jane Cooper"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-pill"
              required
            />
            <button type="submit" className="input-arrow">
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2 ml-1">
            Email
          </label>
          <input
            type="email"
            value={passedEmail}
            disabled
            className="input-field disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
          />
        </div>
      </form>
    </OnboardingLayout>
  );
}
