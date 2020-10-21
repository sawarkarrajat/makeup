import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetails from "./components/ProductDetails";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import "./sass/Dashboard.sass";
import "react-toastify/dist/ReactToastify.css";
import "./App.sass";
/**
 * @file App.js is the root file for this app containing all the routes and paths
 * @author Rajat Sawarkar
 */
/**
 * an app component
 * @property {function}
 */
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app__back"></div>
      <div className="dashboard__main">
        <Navbar />
        <Router>
          <Switch>
            <Route path="/makeup" exact component={Dashboard} />
            <Route
              path="/makeup/productDetails/:id"
              component={ProductDetails}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
