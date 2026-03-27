import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Building2, ArrowRight } from "lucide-react";

export default function Complete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen onboarding-bg flex items-center justify-center px-5">
      <div className="w-full max-w-[400px] flex flex-col items-center text-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-16">
          <Building2 className="w-5 h-5 text-foreground" strokeWidth={2} />
          <span className="text-[17px] font-bold tracking-tight text-foreground">REcollab</span>
        </div>

        {/* Animated checkmark circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <Check className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <h1 className="heading-lg mb-2">You're all set.</h1>
          <p className="text-muted-foreground mb-10">
            Now let's load up your building's documents.
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="w-full h-12 rounded-full bg-foreground text-primary-foreground text-[15px] font-medium hover:opacity-[0.88] transition-opacity flex items-center justify-center gap-2"
          >
            Upload Documents
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
