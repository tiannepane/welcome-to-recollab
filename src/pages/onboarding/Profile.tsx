import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
      <p className="text-muted-foreground mb-8">We just need a few basics.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Jane Cooper"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
            required
          />
        </div>
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={passedEmail}
            disabled
            className="w-full h-11 px-3.5 rounded-lg border border-input bg-muted text-muted-foreground text-[15px] cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity mt-3"
        >
          Continue →
        </button>
      </form>
    </OnboardingLayout>
  );
}
