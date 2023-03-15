import "./App.css";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllMovies from "./components/AllMovies";
import Home from "./components/Home";

function App() {
  const [selected, setSelected] = useState("Movie");
  return (
    <div className="App">
      <Header />

      <Home selected={selected} setSelected={setSelected} />
      <AllMovies selectedType={selected} />
      <Footer />
    </div>
  );
}

export default App;
