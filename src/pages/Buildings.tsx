import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";

const MOCK_BUILDINGS = [
  { id: "1", name: "Maple Ridge Tower", address: "123 Main Street, Toronto, ON" },
];

export default function Buildings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen onboarding-bg">
      <TopNavbar />

      <div className="max-w-[680px] mx-auto px-5 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="heading-lg mb-10">Your Buildings.</h1>

          <div className="space-y-3">
            {MOCK_BUILDINGS.map((building) => (
              <button
                key={building.id}
                className="w-full text-left rounded-2xl bg-[hsl(0,0%,96%)] px-6 py-5 flex items-center justify-between transition-all hover:-translate-y-0.5 hover:bg-[hsl(0,0%,94%)] group"
              >
                <div>
                  <p className="text-[16px] font-medium text-foreground">{building.name}</p>
                  <p className="text-[14px] text-muted-foreground mt-0.5">{building.address}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
              </button>
            ))}

            {/* Add building card */}
            <button
              onClick={() => navigate("/onboarding/building-name")}
              className="w-full rounded-2xl border border-dashed px-6 py-5 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              style={{ borderColor: "hsl(0 0% 88%)" }}
            >
              <Plus className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[15px] font-medium">Add Building</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
