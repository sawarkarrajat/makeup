import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import Collage from "./components/Collage";
// import Panel from "./components/Panel";
import "./App.sass";

function App() {
	return (
		<div className="App">
			<div className="back"></div>
			<Router>
				<Switch>
					<Route path="/" exact component={Dashboard}></Route>
					{/* <Route path="/" exact component={Panel}></Route> */}
					{/* <Route path="/dashboard/" component={}></Route> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
