import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.sass";
/**
 * @file App.js is the root file for this app
 * @author Rajat Sawarkar
 */
/**
 * @property {function}
 */
function App() {
  return (
    <div className="App">
      <div className="app__back"></div>
      <Router>
        <Route path="/" exact component={Dashboard}></Route>
      </Router>
    </div>
  );
}

export default App;
