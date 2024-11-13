import React, { Component } from 'react'
import TaskList from './components/TasksList'

class App extends Component {
	constructor(props) {
		super(props)
		this.state={
			tasks: [],
		}
	}

	render() {

		return (
			<div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						<TaskList />
					</div>
				</div>
			</div>
		);
	}
}

export default App;