import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllMovies from "./components/AllMovies";

function App() {
  const [res, setRes] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/getAllMovies").then((response) => {
      console.log(response.data);
      setRes(response.data);
    });
  }, []);

  if (res) {
    return (
      <div className="App">
        <Header />

        <AllMovies movies={res} />

        <Footer />
      </div>
    );
  }
}

export default App;
