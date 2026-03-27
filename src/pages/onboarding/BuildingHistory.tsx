import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Mic, MicOff, ArrowRight } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

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
    navigate("/onboarding/building-history");
  };

  return (
    <OnboardingLayout currentStep={6}>
      <h1 className="heading-md mb-10">A bit of building history.</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">Year built</label>
          <div className="relative">
            <select value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} className={`pill-select pr-10 ${!yearBuilt ? "text-muted-foreground" : ""}`} required>
              <option value="" disabled>Select year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <label className="text-[13px] font-medium text-muted-foreground">Most recent major renovation</label>
            <span className="text-[11px] text-muted-foreground/60">Optional</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative">
              <select value={renoMonth} onChange={(e) => setRenoMonth(e.target.value)} className={`pill-select pr-10 ${!renoMonth ? "text-muted-foreground" : ""}`}>
                <option value="" disabled>Month</option>
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select value={renoYear} onChange={(e) => setRenoYear(e.target.value)} className={`pill-select pr-10 ${!renoYear ? "text-muted-foreground" : ""}`}>
                <option value="" disabled>Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-muted-foreground mb-2">What renovation was done?</label>
          <div className="flex gap-2">
            <textarea
              rows={3}
              placeholder="e.g. Roof replacement, HVAC upgrade..."
              value={renoDesc}
              onChange={(e) => setRenoDesc(e.target.value)}
              className="pill-textarea flex-1"
            />
            <button
              type="button"
              onClick={toggleMic}
              className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={!isRecording ? { border: "1px solid hsl(0 0% 88%)" } : undefined}
              title={isRecording ? "Stop recording" : "Voice to text"}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!yearBuilt}
          className="w-full h-12 rounded-full bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => navigate("/onboarding/building-history")}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip this step
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
