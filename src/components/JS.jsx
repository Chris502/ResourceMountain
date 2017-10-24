import React, { Component } from 'react'
import axios from 'axios'
import MenuList from './Menu.jsx'
import Modal from './Modal.jsx'
import { connect } from 'react-redux'
import Header from './Header.jsx'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class JS extends Component {
	constructor() {
		super();
		this.state = {
			tuts: [],
			index: 10
		}
		this.moreStuff = this.moreStuff.bind(this)
		this.lessStuff = this.lessStuff.bind(this)
	}
	componentWillMount() {
		axios.get('/category/javascript').then(response => {
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
				<Header />
				<div className="AllTech">

					<div className="lister">
						<h1>
							<i className="fa fa-language" aria-hidden="true"></i>
							JS Resources
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
		authPict: state.authPict,
		userID: state.userID
	}
}
export default connect(mapStateToProps)(JS)