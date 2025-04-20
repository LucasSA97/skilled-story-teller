
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FormPage from "./pages/FormPage";
import TemplatesPage from "./pages/TemplatesPage";
import PreviewPage from "./pages/PreviewPage";
import NotFound from "./pages/NotFound";
import { CVProvider } from "./context/CVContext";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  // <ThemeProvider attribute="class" defaultTheme="system" themes={["light", "dark"]}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CVProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </CVProvider>
    </TooltipProvider>
  </QueryClientProvider>
  // </ThemeProvider>
);

export default App;
