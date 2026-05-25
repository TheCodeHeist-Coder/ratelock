import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row relative selection:bg-[#00E6A8] selection:text-black font-sans antialiased overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LoginForm />
    </div>
  );
}
