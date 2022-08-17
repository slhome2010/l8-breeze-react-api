import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SignIn from "@/views/pages/auth/SignIn";
import SignUp from "@/views/pages/auth/SignUp";
import ForgotPassword from "@/views/pages/auth/ForgotPassword";
import ResetPassword from "@/views/pages/auth/ResetPassword";
import VerifyEmail from "@/views/pages/auth/VerifyEmail";
import Dashboard from '@pages/dashboard';
import Home from '@pages/home';
import NotFoundPage from '@pages/404';

export default function App() {
  return (   
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/password-reset/:token" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </BrowserRouter>     
  );
}
