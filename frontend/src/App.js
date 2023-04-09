import "./App.css";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllMovies from "./components/AllMovies";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";

function App() {
  const [selectedType, setSelectedType] = useState("Movie");
  const [selectedUser, setSelectedUser] = useState("");
  return (
    <div className="App">
      <Header />

      <Home selected={selectedType} setSelected={setSelectedType} />
      {selectedUser ? (
        <UserProfile
          selectedType={selectedType}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        ></UserProfile>
      ) : (
        <AllMovies
          selectedType={selectedType}
          setSelectedUser={setSelectedUser}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
