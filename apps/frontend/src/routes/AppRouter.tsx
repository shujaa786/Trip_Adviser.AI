import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import ChatPage from "../pages/ChatPage";
import NotFoundPage from "../pages/NotFoundPage";

import { AuthGuard } from "./AuthGuard";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/app"
        element={
          <AuthGuard>
            <ChatPage />
          </AuthGuard>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
