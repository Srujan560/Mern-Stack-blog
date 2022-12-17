import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Create from "../Pages/Create";
import Display from "../Pages/Display";
import Login from "../Pages/Login";
import LoginCreate from "./LoginCreate";
import LoginUpdate from "./LoginUpdate";
import Excuser from "../Pages/Exusers";

export default function Navbar() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Display" element={<Display />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LCreate" element={<LoginCreate />} />
        <Route path="/LUpdate" element={<LoginUpdate />} />
        <Route path="/Excuser" element={<Excuser />} />
      </Routes>
    </BrowserRouter>
  );
}
