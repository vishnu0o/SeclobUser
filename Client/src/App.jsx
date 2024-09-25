import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import ProductDetail from "./components/ProductDetailedPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInPage from "./components/signUp";
import Header from "./components/Header";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

function AppContent() {
  const location = useLocation(); // Moved inside BrowserRouter
  const isLoginPage = location.pathname === "/";
  const isSigninPage = location.pathname === "/signIn";

  return (
    <>
      {!isLoginPage && !isSigninPage ? <Header /> : ""}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
