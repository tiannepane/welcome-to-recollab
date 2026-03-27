import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Mic, MicOff } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

const inputClass =
  "w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow";
const selectClass =
  "w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow appearance-none";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function BuildingHistory() {
  const navigate = useNavigate();
  const [yearBuilt, setYearBuilt] = useState("");
  const [renoMonth, setRenoMonth] = useState("");
  const [renoYear, setRenoYear] = useState("");
  const [renoDesc, setRenoDesc] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleMic = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setRenoDesc(transcript);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  }, [isRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to next step (not yet built)
    navigate("/onboarding/building-history");
  };

  return (
    <OnboardingLayout currentStep={6}>
      <h1 className="heading-md mb-2">A bit of building history.</h1>
      <p className="text-muted-foreground mb-8">&nbsp;</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">Year built</label>
          <div className="relative">
            <select value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} className={`${selectClass} ${!yearBuilt ? "text-muted-foreground" : ""}`} required>
              <option value="" disabled>Select year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <label className="text-[13.5px] font-medium text-foreground">Most recent major renovation</label>
            <span className="text-[12px] text-muted-foreground">Optional</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative">
              <select value={renoMonth} onChange={(e) => setRenoMonth(e.target.value)} className={`${selectClass} ${!renoMonth ? "text-muted-foreground" : ""}`}>
                <option value="" disabled>Month</option>
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select value={renoYear} onChange={(e) => setRenoYear(e.target.value)} className={`${selectClass} ${!renoYear ? "text-muted-foreground" : ""}`}>
                <option value="" disabled>Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13.5px] font-medium text-foreground mb-1.5">What renovation was done?</label>
          <div className="flex gap-2">
            <textarea
              rows={3}
              placeholder="e.g. Roof replacement, HVAC upgrade..."
              value={renoDesc}
              onChange={(e) => setRenoDesc(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow resize-none"
            />
            <button
              type="button"
              onClick={toggleMic}
              className={`flex-shrink-0 w-11 h-11 rounded-lg border flex items-center justify-center transition-all ${
                isRecording
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "border-input text-muted-foreground hover:border-foreground/30"
              }`}
              title={isRecording ? "Stop recording" : "Voice to text"}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!yearBuilt}
          className="w-full h-11 rounded-lg bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-1"
        >
          Continue →
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/onboarding/building-history")}
            className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip this step
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
