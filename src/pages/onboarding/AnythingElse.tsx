import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";
import OnboardingLayout from "@/components/OnboardingLayout";

export default function AnythingElse() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
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
      setNotes(transcript);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  }, [isRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/complete");
  };

  return (
    <OnboardingLayout currentStep={7}>
      <h1 className="heading-md mb-2">Anything else we should know?</h1>
      <p className="text-muted-foreground mb-10">Building history, concerns, anything.</p>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            rows={5}
            placeholder="Type or tap the mic to speak..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="pill-textarea w-full pr-12"
          />
          <button
            type="button"
            onClick={toggleMic}
            className={`absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? "bg-foreground text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title={isRecording ? "Stop recording" : "Voice to text"}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="text-[14px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip and finish →
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
