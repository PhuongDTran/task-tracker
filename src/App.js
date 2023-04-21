import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import DashboardPage from "./DashboardPage/DashboardPage";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <>
      <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
