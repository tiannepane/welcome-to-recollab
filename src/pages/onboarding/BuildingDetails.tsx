import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

const BLOCKS = ["1", "2", "3", "4", "5", "6+"];

export default function BuildingDetails() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState("");
  const [floors, setFloors] = useState("");
  const [units, setUnits] = useState("");
  const [sqft, setSqft] = useState("");
  const [residents, setResidents] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/building-history");
  };

  const isValid = blocks && floors && units;

  return (
    <OnboardingLayout currentStep={5}>
      <h1 className="heading-md mb-10">Tell us about the building.</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">Number of blocks / towers</label>
          <div className="relative">
            <select value={blocks} onChange={(e) => setBlocks(e.target.value)} className={`pill-select pr-10 ${!blocks ? "text-muted-foreground" : ""}`} required>
              <option value="" disabled>Select</option>
              {BLOCKS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">Number of floors</label>
          <input type="number" min="1" placeholder="e.g. 12" value={floors} onChange={(e) => setFloors(e.target.value)} className="pill-input" required />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">Number of units</label>
          <input type="number" min="1" placeholder="e.g. 200" value={units} onChange={(e) => setUnits(e.target.value)} className="pill-input" required />
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <label className="text-[13px] font-medium text-muted-foreground">Total gross square footage</label>
            <span className="text-[11px] text-muted-foreground/60">Optional</span>
          </div>
          <input type="number" min="0" placeholder="e.g. 150,000" value={sqft} onChange={(e) => setSqft(e.target.value)} className="pill-input" />
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <label className="text-[13px] font-medium text-muted-foreground">Number of residents</label>
            <span className="text-[11px] text-muted-foreground/60">Optional</span>
          </div>
          <input type="number" min="0" placeholder="e.g. 350" value={residents} onChange={(e) => setResidents(e.target.value)} className="pill-input" />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-12 rounded-[10px] bg-[#0F1729] text-white text-[15px] font-medium hover:bg-[#1a2640] transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </OnboardingLayout>
  );
}
