import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Layout } from "./components";
import { Home, Info, Login, SignIN, Chat } from "./features";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIN />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
