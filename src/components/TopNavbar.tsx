import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-md">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-foreground" strokeWidth={2} />
          <span className="text-[17px] font-bold tracking-tight text-foreground">REcollab</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-foreground text-primary-foreground flex items-center justify-center text-[13px] font-semibold">
            J
          </div>
          <span className="text-[14px] text-foreground hidden sm:inline">Jane Cooper</span>
          <button
            onClick={() => navigate("/login")}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors ml-1"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
