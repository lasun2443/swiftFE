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
import SignupUI from "./pages/SignUp";
import VerifyEmailUI from "./pages/VerifyEmail";
import NowPlayingBar from "./components/NowPlayingBar";

const App = () => {
  let user = localStorage.getItem("user");
  const isAuthenticated = localStorage.getItem("accessToken");

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupUI />} />
        <Route path="/verify" element={<VerifyEmailUI />} />

        <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to={"/"} />} />
          <Route path="/lib" element={<Lib />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <NowPlayingBar />
    </>
  );
};

export default App;
