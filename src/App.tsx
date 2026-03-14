import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AiInterpret from "./pages/AiInterpret";
import Report from "./pages/Report";
import HistoryPage from "./pages/History";
import Clients from "./pages/Clients";
import Schedule from "./pages/Schedule";
import Cases from "./pages/Cases";
import Plans from "./pages/Plans";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/interpret" element={<AiInterpret />} />
            <Route path="/report/:id" element={<Report />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
