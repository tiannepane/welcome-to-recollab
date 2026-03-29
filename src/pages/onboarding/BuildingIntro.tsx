import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function BuildingIntro() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "#F7F8FA" }}
    >
      <div className="flex flex-col items-center text-center" style={{ maxWidth: 480 }}>
        {/* Label */}
        <motion.p
          {...stagger(0)}
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#9CA3B8",
          }}
        >
          You're all set
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...stagger(0.15)}
          style={{
            fontSize: "34px",
            fontWeight: 600,
            color: "#0F1729",
            marginTop: "20px",
          }}
        >
          Now let's add your building.
        </motion.h1>

        {/* Subline */}
        <motion.p
          {...stagger(0.3)}
          style={{
            fontSize: "15px",
            color: "#5A6178",
            lineHeight: 1.6,
            maxWidth: 380,
            marginTop: "16px",
          }}
        >
          This is where REcollab builds your reserve fund model and pulls the right compliance rules.
        </motion.p>

        {/* Button */}
        <motion.button
          {...stagger(0.5)}
          onClick={() => navigate("/onboarding/building-name")}
          className="flex items-center justify-center gap-2"
          style={{
            marginTop: "48px",
            background: "#0F1729",
            color: "white",
            borderRadius: "10px",
            height: "48px",
            padding: "0 32px",
            fontSize: "15px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#1a2640"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#0F1729"; }}
        >
          Add a building &rarr;
        </motion.button>
      </div>
    </div>
  );
}
