import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NextLink from "next/link";
import Home from "@/screens/Home";
import Persons from "@/screens/Persons";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/persons">Persons</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <NextLink href="/settings">Settings (SSR)</NextLink>
          </li>
        </ul>

        <Routes>
          <Route path="/persons" Component={Persons} />
          <Route path="/topics" element={<h1>Topics</h1>} />
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}
