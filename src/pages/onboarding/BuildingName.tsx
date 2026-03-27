import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

export default function BuildingName() {
  const [buildingName, setBuildingName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buildingName.trim()) {
      navigate("/onboarding/building-address");
    }
  };

  return (
    <OnboardingLayout currentStep={3}>
      <h1 className="heading-md mb-2">Name your building.</h1>
      <p className="text-muted-foreground mb-10">You can always add more buildings later.</p>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Maple Ridge Tower"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            className="pill-input pr-14"
            required
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-foreground text-primary-foreground flex items-center justify-center hover:opacity-[0.88] transition-opacity"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
