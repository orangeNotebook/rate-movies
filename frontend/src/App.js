import "./App.css";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllMovies from "./components/AllMovies";

function App() {
  return (
    <div className="App">
      <Header />

      <AllMovies />

      <Footer />
    </div>
  );
}

export default App;
