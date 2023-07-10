import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/screens/Home";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Persons from "@/screens/Persons";
import Appointments from "@/screens/Appointments";

export default function App() {
  return (
    <Router>
      <div className="page-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/persons" Component={Persons} />
            <Route path="/appointments" Component={Appointments} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
