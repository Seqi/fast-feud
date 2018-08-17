import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import HomePage from './HomePage'
import Room from './room/Room'

export default class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/:id' component={Room} />
				</div>
			</BrowserRouter>
		)
	}
}