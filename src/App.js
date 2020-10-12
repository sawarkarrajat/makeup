import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app__back"></div>
      <Router>
        <Route path="/makeup" exact component={Dashboard}></Route>
      </Router>
    </div>
  );
}

export default App;
