import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import Login from "../pages/Login";
import Myaccount from "../pages/Myaccount";
import Profileubdate from "../pages/Profileubdate";
import PostAd from "../pages/PostAd";
import ViewAds from "../pages/ViewAds";
import ViewAdByid from "../pages/ViewAdByid";
import MarketplacePage from "../pages/MarketplacePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route points to Login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Myaccount" element={<Myaccount />} />
      <Route path="/Register" element={<SignupPage />} />
      <Route path="/ProfileUpdate" element={<Profileubdate />} />
      <Route path="/PostAd" element={<PostAd />} />
      <Route path="/ViewAds" element={<ViewAds />} />
      <Route path="/ViewAdByid/:id" element={<ViewAdByid />} />
      <Route path="/MarketplacePage" element={<MarketplacePage />} />

      
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
