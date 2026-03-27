import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";
const selectClass =
  "w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow appearance-none";

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
      <h1 className="heading-md mb-2">Tell us about the building.</h1>
      <p className="text-muted-foreground mb-8">&nbsp;</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">Number of blocks / towers</label>
          <div className="relative">
            <select value={blocks} onChange={(e) => setBlocks(e.target.value)} className={`${selectClass} ${!blocks ? "text-muted-foreground" : ""}`} required>
              <option value="" disabled>Select</option>
              {BLOCKS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">Number of floors</label>
          <input type="number" min="1" placeholder="e.g. 12" value={floors} onChange={(e) => setFloors(e.target.value)} className={inputClass} required />
        </div>

        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">Number of units</label>
          <input type="number" min="1" placeholder="e.g. 200" value={units} onChange={(e) => setUnits(e.target.value)} className={inputClass} required />
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <label className="text-[13.5px] font-medium text-foreground">Total gross square footage</label>
            <span className="text-[12px] text-muted-foreground">Optional</span>
          </div>
          <input type="number" min="0" placeholder="e.g. 150,000" value={sqft} onChange={(e) => setSqft(e.target.value)} className={inputClass} />
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <label className="text-[13.5px] font-medium text-foreground">Number of residents</label>
            <span className="text-[12px] text-muted-foreground">Optional</span>
          </div>
          <input type="number" min="0" placeholder="e.g. 350" value={residents} onChange={(e) => setResidents(e.target.value)} className={inputClass} />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full h-11 rounded-lg bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-1"
        >
          Continue →
        </button>
      </form>
    </OnboardingLayout>
  );
}
