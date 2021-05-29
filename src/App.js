import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';

// Views
import Search from './views/Search';
import Select from './views/Select';
import Summary from './views/Summary';

class App extends React.Component {
	render () {
		return (
			<div>
				<div className="container">
					<Router>
						<Switch>
							<Route path="/podsumowanie">
								<Summary />
							</Route>
							<Route path="/select">
								<Select />
							</Route>
							<Route path="/">
								<Search />
							</Route>
						</Switch>
					</Router>
				</div>
	
			</div>
		);
	}
}

export default App;
