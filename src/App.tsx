import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Profile from "./pages/onboarding/Profile";
import Company from "./pages/onboarding/Company";
import BuildingName from "./pages/onboarding/BuildingName";
import BuildingAddress from "./pages/onboarding/BuildingAddress";
import BuildingDetails from "./pages/onboarding/BuildingDetails";
import BuildingHistory from "./pages/onboarding/BuildingHistory";
import AnythingElse from "./pages/onboarding/AnythingElse";
import Complete from "./pages/onboarding/Complete";
import UploadPage from "./pages/Upload";
import Buildings from "./pages/Buildings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding/profile" element={<Profile />} />
          <Route path="/onboarding/company" element={<Company />} />
          <Route path="/onboarding/building-name" element={<BuildingName />} />
          <Route path="/onboarding/building-address" element={<BuildingAddress />} />
          <Route path="/onboarding/building-details" element={<BuildingDetails />} />
          <Route path="/onboarding/building-history" element={<BuildingHistory />} />
          <Route path="/onboarding/anything-else" element={<AnythingElse />} />
          <Route path="/onboarding/complete" element={<Complete />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
