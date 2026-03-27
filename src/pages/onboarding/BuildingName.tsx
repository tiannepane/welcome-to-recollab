import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <p className="text-muted-foreground mb-8">You can always add more buildings later.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="e.g. Maple Ridge Tower"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          className="w-full h-12 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
          required
          autoFocus
        />
        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity"
        >
          Continue →
        </button>
      </form>
    </OnboardingLayout>
  );
}
