import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import { Home, Info, Login, SignIN, Chat } from "../features";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIN />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
