import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, FallbackUI } from "./components/index.js";
import ErrorBoundaryWrapper from "./errorBoundary/ErrorBoundaryWrapper.jsx";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen min-w-screen px-5">
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
