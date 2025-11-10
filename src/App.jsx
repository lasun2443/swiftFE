import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
// import { Layout } from "lucide-react";
import Home from "./pages/Home";
import Lib from "./pages/Libraryy";
import Layoutt from "./pages/Layoutt";
import AlbumPage from "./pages/AlbumPage";
import AuthGuard from "./Auth/Auth";

const App = () => {
  let user = localStorage.getItem("user");
  const isAuthenticated = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AuthGuard isAuthenticated={isAuthenticated}/>} >
      <Route path="/" element={<Navigate to={'/home'}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/lib" element={<Lib />} />
        <Route path="/album/:id" element={<AlbumPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
