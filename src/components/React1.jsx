import React, { Component } from 'react'
import axios from 'axios'
import MenuList from './Menu.jsx'
import Modal from './Modal.jsx'
import { connect } from 'react-redux'
import UserModal from './UserModal'


class React1 extends Component {
	constructor() {
		super();
		this.state = {
			tuts: [],
			index: 10,
		}
		this.moreStuff = this.moreStuff.bind(this)
		this.lessStuff = this.lessStuff.bind(this)
	}

	componentWillMount() {
		axios.get('http://localhost:3001/category/react').then(response => {
			console.log(response)
			this.setState({
				tuts: response.data
			})
		})
	}

	moreStuff() {
		if (this.state.index < this.state.tuts.length) {
			this.setState({
				index: this.state.index + 10
			})
		} else {
			return null
		}
	}
	lessStuff() {
		if (this.state.index !== 10 && this.state.index > 0) {
			this.setState({
				index: this.state.index - 10
			})
		}
		else {

			return null
		}
	}


	render() {
		let results = this.state.tuts.map((c, index) => {
			if (index <= this.state.index && index <= this.state.tuts.length) {
				
				return (
					<div key={index} className="response-list">
						<h5 className='techName'>{c.tech}  </h5><a href={c.link} className='techLink'>{c.link}</a>
						<p className='linkDesc'>{c.linkdesc}</p>
						<p className='dateCreated'> {new Date(c.datecreated).toString()}</p>

					</div>

				)


			} return null
		})
		return (
			<div className='App'>
				<MenuList />

				<div className="AllTech">
					<div className='UserBox-app'>
						<UserModal />
						<Modal />
					</div>
					<div className="lister">
						<h1>
							<i className="fa fa-cubes" aria-hidden="true"></i>
							React Resources
						</h1>
						<h2> Use Resource Management Tab to Add a Resource</h2>
						{results}
						<div className='button-box'>

							<button className='more-button' onClick={this.moreStuff}>More</button>
							<button className='more-button' onClick={this.lessStuff}>Less</button>

						</div>
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		authName: state.authName,
		authPict: state.authPict
	}
}

export default connect(mapStateToProps)(React1)