import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import Home from "./components/Home";
import About from "./components/About";

import Admin from "./components/Admin";
import AdminPortalLogin from "./components/AdminPortalLogin";

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/admin-portal" element={<AdminPortalLogin />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
