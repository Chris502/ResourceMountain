import React, { Component } from 'react'
import './../styles/main.css'
import MenuList from './Menu.jsx'
import axios from 'axios'
import { connect } from 'react-redux';
import { authMe, authID, getTuts } from './../ducks/reducer.js'
//import { getAllTuts } from './../utils/Api-Call.js'
import UserModal from './UserModal'
import Modal from './Modal'
import reactLogo from './../styles/logo.svg'
import es6Logo from './../styles/es6.svg'
import sqlLogo from './../styles/sql.svg'
import nodeLogo from './../styles/node.svg'
import reduxLogo from './../styles/redux.svg'
import sassLogo from './../styles/sass.svg'
import AppBar from 'material-ui/AppBar';
import Header from './Header.jsx'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';





class App extends Component {
	constructor() {
		super()
		this.state = {
			user: '',
			pic: '',
			userTable: '',
			searchResults: [],
			tuts: [],
			searchVal: ''
		}
		//this.getName=this.getName.bind(this);
		this.handleSearch = this.handleSearch.bind(this)
		this.pushSearch = this.pushSearch.bind(this)
		this.handleTouchTap = this.handleTouchTap.bind(this)

	}
	componentWillMount() {
		axios.get('/user').then(response => {
			console.log(response.data.displayName)
			this.setState({
				user: response.data.displayName,
				pic: response.data.picture
			})
			this.props.authMe(this.state.user, this.state.pic)


			axios.post('/user', {
				username: this.state.user
			})

		})
		axios.get('/allTuts').then(response => {
			console.log(response)
			this.setState({
				tuts: response.data
			})
			this.props.getTuts(this.state.tuts)
		})
	}
	handleSearch(e) {
		this.setState({ searchVal: e.target.value })
	}

	pushSearch(val) {
		axios.get('./search?search=' + val).then(response => {
			this.setState({
				searchResults: response.data
			})
		})
	}


	handleTouchTap() {
		alert('onClick triggered on the title component');
	}


	render() {
		console.log(this.state.searchResults)
		let username = localStorage.getItem("user")
		let recent = this.state.tuts.map((c, index) => {
			if (index <= 5)
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
		})
		let search = this.state.searchResults.map((c, index) => {
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

		})
		return (
			<MuiThemeProvider>
				<div className='App'>
					<Header />

					<div className="app-content">
						<div className="home-box">


							<div className="recent-tut-box">
								<div className="recents-head">
									<div className="welcome-head">
										<h2 className="para-wel">Welcome to the Resource Website at DevMountain. This is a repository of all the resources I used throughtout my cohort to solidify the concepts taught at <span> DevMountain</span>. Technologies used to create this site are listed below! </h2>


										<div className="tech-box">
											<img src={reactLogo} alt="wee" />
											<img src={es6Logo} alt="wee" />
											<img src={sqlLogo} alt="wee" />
											<img src={nodeLogo} alt="wee" />
											<img src={reduxLogo} alt="wee" />
											<img src={sassLogo} alt="wee" />

										</div>
									</div>
									<h1> Recent Tuts</h1></div>
								{recent}
							</div>
							<div className="recent-tut-box searcher">
								<div className="search-head"><h1> Search Tutorials</h1></div>
								<div className="input-search">
									<input type="text" value={this.state.searchVal} onChange={this.handleSearch} placeholder="Search Here"></input>
									<button onClick={_ => this.pushSearch(this.state.searchVal)}> Search</button>
								</div>
								{search}
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
		authPict: state.authPict,
		userID: state.userID,
		tuts: state.tuts
	}
}
export default connect(mapStateToProps, { authMe, authID, getTuts })(App)