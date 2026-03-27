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
      navigate("/onboarding/building-name");
    }
  };

  return (
    <OnboardingLayout currentStep={2}>
      <h1 className="heading-md mb-10">Tell us about your company.</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2 ml-1">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Acme Property Group"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2 ml-1">
            Your Role
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`role-pill ${
                  selectedRole === role ? "role-pill-selected" : "role-pill-unselected"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <button
            type="submit"
            disabled={!companyName.trim() || !selectedRole}
            className="btn-primary-pill"
          >
            Continue
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
