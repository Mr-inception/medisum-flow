import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedicalLayout from "./components/MedicalLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Summarize from "./pages/Summarize";
import Dataset from "./pages/Dataset";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedicalLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="summarize" element={<Summarize />} />
          <Route path="dataset" element={<Dataset />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
