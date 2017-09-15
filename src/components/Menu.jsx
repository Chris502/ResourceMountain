import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { authID } from './../ducks/reducer.js'
import mtnSVG from './../styles/mtn.svg'


class MenuList extends Component {
    constructor() {
        super();
        this.state = {
            tech: [],
            serverURL: 'http://localhost:3000/',
            userTable: '',
            contrib: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/getNames').then(response => {
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

    render() {
        console.log(this.props.authName)
        let list = this.state.tech.map((c, i) => {
            return (
                <Link to={c.tech} className="menu-item" key={i} ><i className="fa fa-server" aria-hidden="true"></i>
                    {c.tech}</Link>
            )
        })


        return (
            <div>
                <Menu className="menu" pageWrapId={"page-wrap"}>

                    <div className="menu-pic"><img src={mtnSVG}></img></div>
                    <h1 className="menu-head">The Mountain Directory</h1>

                    <Link to='/Home' className="menu-item"><i className="fa fa-home" aria-hidden="true"></i>
                        Home</Link>
                    <Link to='/AllTech' className="menu-item"><i className="fa fa-calendar" aria-hidden="true"></i>
                        Most Recent</Link>
                    {list}
                    <Link to='/Admin' className="menu-item"><i className="fa fa-user-circle" aria-hidden="true"></i>
                        Admin</Link>

                    <a href="http://localhost:3001/auth/logout" className='menu-item'><i className="fa fa-sign-out" aria-hidden="true"></i>
                        Log Out</a>

                </Menu>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        authName: state.authName,
        userID: state.userID
    }
}
export default connect(mapStateToProps, { authID })(MenuList)