import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Simulations from "./pages/Simulations";
import Simulation from "./pages/Simulation";
import Quiz from "./pages/Quiz";
import Emergency from "./pages/Emergency";
import Admin from "./pages/Admin";
import GovernmentAlerts from "./pages/GovernmentAlerts";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/simulation/:id" element={<Simulation />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/government-alerts" element={<GovernmentAlerts />} />
          <Route path="/achievements" element={<Achievements />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
