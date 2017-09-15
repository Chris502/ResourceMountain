import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import 'font-awesome/css/font-awesome.min.css'
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import Landing from './components/Landing.jsx'
import AllTech from './components/AllTech.jsx'
import React1 from './components/React1'
import Node from './components/Node'
import Git from './components/Git'
import Css from './components/Css'
import JS from './components/JS'
import mySQL from './components/SQL'
import Admin from './components/Admin'
import store from './utils/store.js'
import { Provider } from 'react-redux'

ReactDOM.render(
	<Provider store = {store}>
	<Router>
	<Switch>
	<Route exact path='/' component={Landing}/>
	<Route path='/Home' component={App}/>
	<Route path='/Admin' component={Admin}/>
	<Route path='/AllTech' component={AllTech}/>
	<Route path='/React' component={React1}/>
	<Route path='/nodejs' component={Node}/>
	<Route path='/git' component={Git}/>
	<Route path='/javascript' component={JS}/>
	<Route path='/css' component={Css}/>
	<Route path='/SQL' component={mySQL}/>
	</Switch>
	</Router>
	</Provider>
	,
document.getElementById('root'))