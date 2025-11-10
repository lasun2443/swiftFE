import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
// import { Layout } from "lucide-react";
import Home from "./pages/Home";
import Lib from "./pages/Libraryy";
import Layoutt from "./pages/Layoutt";
import AlbumPage from "./pages/AlbumPage";

const App = () => {
  let user = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />

      <Route path="/" element={<Layoutt/>}>
        <Route path="/home" element={<Home />} />
        <Route path="/lib" element={<Lib />} />
      </Route>
      <Route path="/album/:id" element={<AlbumPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
