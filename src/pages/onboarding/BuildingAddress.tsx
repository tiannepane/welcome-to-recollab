import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
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

const selectClass =
  "w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow appearance-none";

const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";

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
      <h1 className="heading-md mb-2">Where is it located?</h1>
      <p className="text-muted-foreground mb-8">&nbsp;</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">Street Address</label>
          <input type="text" placeholder="123 Main Street" value={street} onChange={(e) => setStreet(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">City</label>
          <input type="text" placeholder="Toronto" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">Country</label>
          <div className="relative">
            <select value={country} onChange={(e) => { setCountry(e.target.value); setRegion(""); }} className={`${selectClass} ${!country ? "text-muted-foreground" : ""}`} required>
              <option value="" disabled>Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {(country === "Canada" || country === "United States") && (
          <div>
            <label className="block text-[13.5px] font-medium text-foreground mb-1.5">{regionLabel}</label>
            <div className="relative">
              <select value={region} onChange={(e) => setRegion(e.target.value)} className={`${selectClass} ${!region ? "text-muted-foreground" : ""}`}>
                <option value="" disabled>Select {regionLabel.toLowerCase()}</option>
                {regionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        )}

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
