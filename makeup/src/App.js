import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import Collage from "./components/Collage";
import "./App.sass";
import Panel from "./components/Panel";

function App() {
 
  return (
    <div className="App">
      <div className="back"></div>
      <Router>
        <Route path="/" exact component={Dashboard}></Route>
        {/* <Route path="/" exact component={Panel}></Route> */}
        {/* <Route path="/dashboard/" component={}></Route> */}
      </Router>
    </div>
  );
}

export default App;
