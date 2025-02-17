import "./App.css";
import Navbar from "./Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./AddTask";
import Todolist from "./Todolist";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<AddTask />}></Route>
          <Route path="task" element={<Todolist />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
