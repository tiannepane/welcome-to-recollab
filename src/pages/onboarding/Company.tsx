import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/OnboardingLayout";

const ROLES = [
  "Property Manager",
  "Board Member",
  "Asset Manager",
  "Consultant / Advisor",
];

export default function Company() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim() && selectedRole) {
      // Navigate to next step (not yet built)
      navigate("/onboarding/company");
    }
  };

  return (
    <OnboardingLayout currentStep={2}>
      <h1 className="heading-md mb-2">Tell us about your company.</h1>
      <p className="text-muted-foreground mb-8"> </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Acme Property Group"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
            required
          />
        </div>

        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">
            Your Role
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`h-11 rounded-lg text-[14px] font-medium transition-all ${
                  selectedRole === role
                    ? "bg-foreground text-primary-foreground"
                    : "bg-background border border-input text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!companyName.trim() || !selectedRole}
          className="w-full h-11 rounded-lg bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </form>
    </OnboardingLayout>
  );
}
