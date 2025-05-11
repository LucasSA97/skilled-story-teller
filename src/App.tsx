
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CVProvider } from "./context/CVContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeToggle } from "./components/ThemeToggle";
import Header from "./components/Header";

// Import page components
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import FormPage from "./pages/FormPage";
import TemplatesPage from "./pages/TemplatesPage";
import PreviewPage from "./pages/PreviewPage";
import MyCVsPage from "./pages/MyCVsPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <LanguageProvider>
              <CVProvider>
                <div className="min-h-screen flex flex-col bg-background text-foreground">
                  <Header />
                  <main className="flex-1 pt-14">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/form" element={
                        <ProtectedRoute>
                          <FormPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/templates" element={
                        <ProtectedRoute>
                          <TemplatesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/preview" element={
                        <ProtectedRoute>
                          <PreviewPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/my-cvs" element={
                        <ProtectedRoute>
                          <MyCVsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <ThemeToggle />
                </div>
              </CVProvider>
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
