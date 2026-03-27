import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

const COUNTRIES = ["Canada", "United States", "Other"] as const;

const CA_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon",
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export default function BuildingAddress() {
  const navigate = useNavigate();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const regionOptions = useMemo(() => {
    if (country === "Canada") return CA_PROVINCES;
    if (country === "United States") return US_STATES;
    return [];
  }, [country]);

  const regionLabel = country === "Canada" ? "Province" : country === "United States" ? "State" : "State / Province";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/building-details");
  };

  const isValid = street.trim() && city.trim() && country;

  return (
    <OnboardingLayout currentStep={4}>
      <h1 className="heading-md mb-10">Where is it located?</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">Street Address</label>
          <input type="text" placeholder="123 Main Street" value={street} onChange={(e) => setStreet(e.target.value)} className="pill-input" required />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">City</label>
          <input type="text" placeholder="Toronto" value={city} onChange={(e) => setCity(e.target.value)} className="pill-input" required />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">Country</label>
          <div className="relative">
            <select value={country} onChange={(e) => { setCountry(e.target.value); setRegion(""); }} className={`pill-select pr-10 ${!country ? "text-muted-foreground" : ""}`} required>
              <option value="" disabled>Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {(country === "Canada" || country === "United States") && (
          <div>
            <label className="block text-[13px] font-medium text-muted-foreground mb-2">{regionLabel}</label>
            <div className="relative">
              <select value={region} onChange={(e) => setRegion(e.target.value)} className={`pill-select pr-10 ${!region ? "text-muted-foreground" : ""}`}>
                <option value="" disabled>Select {regionLabel.toLowerCase()}</option>
                {regionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        )}

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
