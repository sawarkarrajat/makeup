import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.sass";
import ProductDetails from "./components/ProductDetails";
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
			<div className="back"></div>
			<Router>
					<Route path="/" exact component={Dashboard}></Route>
					<Route path="/ProductDetails" component={ProductDetails}></Route>
			</Router>
		</div>
	);
}

export default App;
