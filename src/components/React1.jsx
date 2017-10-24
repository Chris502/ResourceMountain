import React, { Component } from 'react'
import axios from 'axios'
import MenuList from './Menu.jsx'
import Modal from './Modal.jsx'
import { connect } from 'react-redux'
import Header from './Header.jsx'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



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
		axios.get('/category/react').then(response => {
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
					<Card className="recent-tuts">
						<CardHeader
							title={<h3>{c.tech}</h3>}
							subtitle={<p><span className="resource-tag">Link:  &nbsp;</span>  <a href={c.link}>{c.link}</a> </p>}
							actAsExpander={true}
							showExpandableButton={true}
						/>
						<CardText expandable={true}><p>{c.linkdesc}</p>
						<p>{new Date(c.datecreated).toString()}</p>
										
   						</CardText>
					</Card>	
				)


			} return null
		})
		return (
			<MuiThemeProvider>
			<div className='App'>
				<Header/>

				<div className="AllTech">
					
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
			</MuiThemeProvider>
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