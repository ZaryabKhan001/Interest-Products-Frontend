import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, FallbackUI } from "./components/index.js";
import ErrorBoundaryWrapper from "./errorBoundary/ErrorBoundaryWrapper.jsx";
import { Toaster } from "@/components/ui/sonner";
import { v4 as uuidv4 } from "uuid";

function App() {
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
  }, []);

  return (
    <div className="bg-slate-900 text-white min-h-screen w-screen px-5">
      <ErrorBoundaryWrapper>
        <Suspense fallback={<FallbackUI />}>
          <div className="container mx-auto">
            <Header />
            <Outlet />
          </div>
          <Toaster />
        </Suspense>
      </ErrorBoundaryWrapper>
    </div>
  );
}

export default App;
