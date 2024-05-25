import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "../components";
import { Home, Info, Login, SignIN, Chat, Users } from "../features";
import { AuthProvider } from "@/auth-provider";
import { ProtectedRoute } from "@/components";

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIN />} />
            <Route
              path="/chat"
              element={<ProtectedRoute element={<Chat />} />}
            />
            <Route
              path="/users"
              element={<ProtectedRoute element={<Users />} adminOnly />}
            />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
