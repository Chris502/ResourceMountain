import React, {Component}from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavigationOpen from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux'
import { authID } from './../ducks/reducer.js'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'
import { Link } from 'react-router-dom'
import mtnSVG from './../styles/mtn.svg'
import UserModal from './UserModal'
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class Header extends Component {
    constructor(){
    super()
    this.state = {
        tech:[],
        open: false

    }
    }
    componentWillMount() {
        axios.get('/getNames').then(response => {
            console.log(response)
            this.setState({
                tech: response.data
            })
        })
        axios.get('/allUsers').then(response => {
            if (this.props.authName) {
                let byID = response.data.filter((e) => {
                    if (e.username === this.props.authName) {
                        return e
                    } return null
                })
                this.setState({
                    userTable: byID[0].id
                })
                this.props.authID(this.state.userTable)
            } return null
        })

    }
    handleToggle = () => this.setState({open: !this.state.open});


    
    render(){ 
        let list = this.state.tech.map((c, i) => {
            return (
                <Link to={c.tech} className="menu-item" key={i} >
                <MenuItem><i className="fa fa-server" aria-hidden="true"></i>
                    {c.tech}</MenuItem></Link>
            )
        })
        let show = this.state.open ? '"display":"none"': null
    return(
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
    <AppBar
                        className="app-bar"
						title={<p className="app-header">Resource Mountain</p>}
						onTitleTouchTap={this.handleToggle}
                        iconElementRight={<FlatButton><UserModal/></FlatButton>}
                        style={{show}}
                        iconElementLeft={<i className="k" aria-hidden="true"></i>}
                    
                    />
                    <Drawer open={this.state.open}>
                    <div className="menu-pic"><img src={mtnSVG}></img></div>

                    {list}
        </Drawer>
        </div>
        </MuiThemeProvider>
    )               
}
    }

    function mapStateToProps(state) {
        return {
            authName: state.authName,
            userID: state.userID
        }
    }
    export default connect(mapStateToProps, { authID })(Header)