import React from 'react';
import { createStore } from 'redux'
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';

// Views
import Search from './views/Search';

function App() {
	return (
		<div>
		<Router>
			<Switch>
				<Route path="/">
					<Search />
				</Route>
			</Switch>
		</Router>
		</div>
	);
}

export default App;
