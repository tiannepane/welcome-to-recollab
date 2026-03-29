import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
      navigate("/onboarding/building-intro");
    }
  };

  return (
    <OnboardingLayout currentStep={2}>
      <h1 className="heading-md mb-10">Tell us about your company.</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Acme Property Group"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="pill-input"
            required
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">
            Your Role
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`h-11 rounded-[10px] text-[14px] font-medium transition-all ${
                  selectedRole === role
                    ? "bg-[#0F1729] text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={selectedRole !== role ? { border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.03)" } : undefined}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!companyName.trim() || !selectedRole}
          className="w-full h-12 rounded-[10px] bg-[#0F1729] text-white text-[15px] font-medium hover:bg-[#1a2640] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </OnboardingLayout>
  );
}
