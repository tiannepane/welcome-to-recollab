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
            className="input-pill"
            required
            autoFocus
          />
          <button type="submit" className="input-arrow">
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
