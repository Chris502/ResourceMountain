import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Admin extends Component {
    constructor() {
        super();
        this.state = {
            tuts: [],
            userTuts:[],
            tutsID:'',
            userList: [],
            authPic: '',
            dbUserName: '',
            updateId: '',
            updatePerm: '',
            updateLink:''
        }
        this.handleTutID = this.handleTutID.bind(this)
        this.getTuts = this.getTuts.bind(this)
        this.deleteMe = this.deleteMe.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.handleId = this.handleId.bind(this)
        this.handlePerm = this.handlePerm.bind(this)
        this.permUpdate = this.permUpdate.bind(this)
        this.updateDesc = this.updateDesc.bind(this)
        this.handleLinkUpdate=this.handleLinkUpdate.bind(this)
    }
  
    componentDidMount() {
        axios.get('/allUsers').then(response => {
            response.data.filter((c) => {
                if (c.permission === 'admin' && c.username === localStorage.getItem("user")) {
                    this.setState({
                        dbUserName: c.username
                    })

                } return null
            })

        })
    }


    getTuts() {
        axios.get('/allTuts').then(response => {
            
            this.setState({
                tuts: response.data,
                userList: []
            })
        })
    }
    handleLinkUpdate(e){
        this.setState({
            updateLink: e.target.value
        })
    }
   

    getTutsByUser(id){
        axios.get('/tutsByUser/' + id).then(response =>{
            console.log(response)
            this.setState({
                userTuts: response.data
            })
        })
    }
    getUsers() {
        axios.get('/allUsers').then(response => {
            this.setState({
                userList: response.data,
                tuts: []
            })
        })
    }
    deleteMe(id) {
        if (this.state.dbUserName) {
            axios.delete('/allTuts/'+id).then(response => {
                console.log(response)
                this.setState({
                    tuts: response.data
                })
            })
        } else {

            return alert('You Do Not Have Permission To Do That')
        }
    }
    handleId(e) {
        this.setState({
            updateId: e.target.value
        })

    }
    handleTutID(e){
        this.setState({
            tutsID: e.target.value
        })
    }
    handlePerm(e) {
        this.setState({
            updatePerm: e.target.value
        })
    }
    permUpdate(id) {
        axios.put('/user/', {
            id: this.state.updateId,
            permission: this.state.updatePerm
        }).then(response =>{
            this.setState({
                userList: response.data
            })
        })
    }
    updateDesc(id){
        axios.put('/allTuts/' + id, {
            linkdesc: this.state.updateLink
        }).then(response =>{
            console.log(response)
            this.setState({
                tuts: response.data
            })
        })
    }



    render() {
        
        //Renders All Tutorials
        let results = this.state.tuts.map((c, index) => {
            return (

                <div key={index} className="response-list-admin">
                    <h5 className='techName'>{c.tech}  </h5><a href={c.link} className='techLink'>{c.link}</a><br/>
                    <textarea onChange={this.handleLinkUpdate}className="link-desc">{c.linkdesc}</textarea>
                    <p className='dateCreated'> {new Date(c.datecreated).toString()}</p>
                    <button onClick={_ => this.deleteMe(c.id)}>Delete Resource</button>
                    <button onClick={_ => this.updateDesc(c.id)}>Update Description</button>
                </div>

            )
        })
        //Renders Users
        let users = this.state.userList.map((c, index) => {
            return (
                <div key={index} className='user-div'>
                    <ul className="user-list">
                        <li>
                            <strong>ID</strong>: <span className='credentials'>  {c.id} </span>
                            <strong>User</strong>:<span className='credentials'> {c.username} </span>
                            <strong>Account Type</strong>:  <span className='credentials'>{c.permission}</span>
                        </li>
                    </ul>

                </div>
            )
        })
        //RENDERS TUTORIALS UPLOADED BY USER
        let tutsByUser = this.state.userTuts.map((c,index)=>{
            return (
                <div key={index} className="response-list-userTuts">
                    <h1>{c.tech}</h1>
                    
                    <h3> <a href={c.link}>{c.link}</a></h3>
                       <p><span className="id-tag">User:</span> {c.id}</p>
                        
                        <h5>{c.username}</h5>
                    
                </div>
                
            )

        })

        //renders dropdown for user id
        let dropper = this.state.userList.map((c, i) => {
            return (


                <option key={i} value={c.id}>{c.id}</option>



            )
        })
        //renders update permissions inputs TURNARY
        let userPanel = this.state.userList[0] ? <div><select
            value={this.state.updateId}
            onChange={this.handleId}>
            <option disabled defaultValue> -- select an option -- </option>

            {dropper}
        </select>
            <select
                value={this.state.updatePerm}
                onChange={this.handlePerm}>
                <option disabled defaultValue> -- select an option -- </option>

                <option value='admin'>Admin</option>
                <option value='guest'>Guest</option>
            </select>
            <button onClick={this.permUpdate}>Update</button>
            <br/>
            <select
            value={this.state.tutsID}
            onChange={this.handleTutID}>
            <option disabled defaultValue> -- select an option -- </option>

            {dropper}
        </select>
        
            <button onClick={_ => this.getTutsByUser(this.state.tutsID)}>Filter by ID</button>
            {tutsByUser}

        </div>
            : null

        let userButtonClass = this.state.userList[0] ? 'active' : 'not-active'
        let resourceButtonClass = this.state.tuts[0] ? 'active' : 'not-active'


        //TURNARY CHECKING FOR ADMIN STATUS
        let adimControl = this.state.dbUserName ? <div className="admin-bar">
            <button onClick={this.getTuts} className={resourceButtonClass}>Manage Resources</button>
            <button onClick={this.getUsers} className={userButtonClass}>Update User Permissions</button>
            <Link to='/Home'> <button className="not-active homeButton">Go to Homepage</button> </Link>
            <div className="admin-panel">
                {users}
                {userPanel}
                {results}
            </div>
        </div> : <div className="no-auth">
            <p> ACCESS DENIED </p>
            <Link to='/Home'> <button className="not-active homeButton">Go to Homepage</button> </Link>
        </div>

        return (
            <div className="admin-main">
                {adimControl}
            </div>

        )
    }
}
function mapStateToProps(state){
    return {
        authName: state.authName,
        authPic: state.authPic
    }
        

    
}
export default connect(mapStateToProps)(Admin)
