import React, { Component } from 'react'
import axios from 'axios'
import MenuList from './Menu.jsx'
import Modal from './Modal.jsx'
import { connect } from 'react-redux'
import UserModal from './UserModal'
import Header from './Header.jsx'


class Git extends Component {
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
		axios.get('/category/git').then(response => {
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
		console.log()
		let results = this.state.tuts.map((c, index) => {
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


		console.log(this.props.user)
		return (
			<div className='App'>
				<Header/>
				<div className="AllTech">
					<div className='UserBox-app'>
					</div>
					<div className="lister">
						<h1>
							<i className="fa fa-github-alt fa-lg" aria-hidden="true"></i>
							Git Resources
						</h1>
						<h2> Use Resource Management Tab to Add a Resource</h2>
						{results}

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
		tuts: state.tuts
	}
}
export default connect(mapStateToProps)(Git)