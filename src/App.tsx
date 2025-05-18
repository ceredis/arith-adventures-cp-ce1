
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CalculEcrit from "./pages/CalculEcrit";
import Numeration from "./pages/Numeration";
import CalculMental from "./pages/CalculMental";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import { GamificationProvider } from "./contexts/GamificationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GamificationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calcul-ecrit" element={<CalculEcrit />} />
            <Route path="/numeration" element={<Numeration />} />
            <Route path="/calcul-mental" element={<CalculMental />} />
            <Route path="/rewards" element={<Rewards />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GamificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
