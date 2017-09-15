import React, { Component } from 'react'
import axios from 'axios'
import MenuList from './Menu.jsx'
import Modal from './Modal.jsx'
import { connect } from 'react-redux'
import UserModal from './UserModal.jsx'

//ReactModal.setAppElement("#modalBox")
class AllTech extends Component {
	constructor() {
		super();
		this.state = {

			index: 10
		}
		this.moreStuff = this.moreStuff.bind(this)
		this.lessStuff = this.lessStuff.bind(this)
	}

	//componentWillMount() { 
	//	axios.get('http://localhost:3001/allTuts').then(response => {
	//		console.log(response)
	//		this.setState({
	//			tuts: response.data
	//		})
	//	})
	//}
	//componentDidMount() {
	//	axios.get('/user').then(response => {
	//		console.log(response)
	//		this.setState({
	//			user: response.data.displayName,
	//			pic: response.data.picture
	//		})
	//	})
	//}
	moreStuff() {
		if (this.state.index < this.props.tuts.length) {
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
		console.log("redux" + this.props.tuts)
		let results = this.props.tuts.map((c, index) => {
			if (index <= this.state.index && index <= this.props.tuts.length) {
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
				<div className='UserBox-app'>

					<UserModal />
					<Modal />

				</div>
				<div className="AllTech">

					<div className="lister">
						<h1>All Technologies</h1>
						{results}
						<div className='button-box'>
							{console.log(this.state.more)}

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
		authPict: state.authPict,
		userID: state.userID,
		tuts: state.tuts

	}
}
export default connect(mapStateToProps)(AllTech)