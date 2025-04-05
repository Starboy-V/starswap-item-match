
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import AddItem from "./pages/AddItem";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import TimeSwap from "./pages/TimeSwap";
import StarfieldBackground from "./components/StarfieldBackground";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        // Set loading to false after a minimum delay to prevent flash
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="animate-pulse">
          <Loader size={50} className="text-primary animate-spin" />
        </div>
        <p className="mt-4 text-muted-foreground">Loading StarSwap X...</p>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <StarfieldBackground />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/timeswap" element={<TimeSwap />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
