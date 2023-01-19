import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Posts from "./components/posts";
import Contact from "./components/contact";
import Header from "./components/Header";
import Mainlayout from "./components/layouts/Mainlayout";
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Mainlayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="article/:id" element={<Posts />} />
        </Routes>
      </Mainlayout>
    </BrowserRouter>
  );
};

export default Router;
