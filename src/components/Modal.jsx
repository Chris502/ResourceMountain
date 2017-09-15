import React, { Component } from 'react'
import ReactModal from 'react-modal';
import axios from 'axios'
import { connect } from 'react-redux'
import { getTuts } from './../ducks/reducer'



class Modal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            tech: [],
            techCat: '',
            link: '',
            linkdesc: '',
            techNames: [],
            newTut: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleTech = this.handleTech.bind(this);
        this.handleLinkDesc = this.handleLinkDesc.bind(this);
        this.postThings = this.postThings.bind(this)
        //this.updateList = this.updateList.bind(this)
    }
    componentWillMount() {
        axios.get('http://localhost:3001/getNames').then(response => {
            console.log(response)
            this.setState({
                techNames: response.data
            })
        })
    }
    componentDidMount() {
        if (this.state.showModal === false)
            axios.get('http://localhost:3001/allTuts').then(response => {
                console.log(response)
                this.setState({
                    newTut: response.data
                })
                this.props.getTuts(this.state.newTut)
            })

    }
    //updateList(){
    //    axios.get('http://localhost:3001/allTuts').then(response => {
    //		console.log(response)
    //		this.setState({
    //			newTut: response.data
    //		})
    //		this.props.getTuts(this.state.newTut)
    //	})
    //
    //
    //}
    //
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    postThings() {
        const { techCat, link, linkdesc } = this.state
        techCat && link && linkdesc ?
            axios.post('/allTuts', {
                tech: this.state.techCat,
                link: this.state.link,
                linkdesc: this.state.linkdesc,
                pic: this.state.pic,
                userID: localStorage.getItem("id22")
            }) : alert("Please complete all fields")
        this.setState({
            techCat: '',
            link: '',
            linkdesc: '',
            pic: ''
        })
    }
    handleTech(e) {
        this.setState({
            techCat: e.target.value
        })
    }
    handleLink(val) {
        this.setState({
            link: val
        })
    }
    handleLinkDesc(val) {
        this.setState({
            linkdesc: val
        })
    }


    render() {
        let updater = this.state.techCat && this.state.link && this.state.linkdesc ? <button className='button-modal' onClick={this.postThings}>Submit</button> : <button className='button-modal' onClick={this.updateList}>Update List</button>


        let techList = this.state.techNames.map((c, index) => {
            return (
                <option key={index} value={c.tech}>
                    {c.tech}</option>
            )
        })
        console.log("PICTURE" + this.state.techCat)
        console.log(this.props.userID)
        return (
            <div className='modal'>
                <button onClick={this.handleOpenModal}>Resource Management</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <p>Add a Resource!</p>
                    <div className="input-Modal">
                        <div className='input-bars'>
                            <select
                                value={this.state.techCat}
                                onChange={this.handleTech}>
                                <option disabled defaultValue> -- select an option -- </option>

                                {techList}
                            </select>
                            <input className='text-box' type='text' placeholder='Link' value={this.state.link} onChange={e => { this.handleLink(e.target.value) }} />
                            <textarea rows='3' className='text-area' type='text' placeholder='LinkDesc' value={this.state.linkdesc} onChange={e => { this.handleLinkDesc(e.target.value) }}> </textarea>
                            <button className='button-modal' onClick={this.postThings}>Submit</button>
                            <button className='button-modal' onClick={this.handleCloseModal}>Close Modal</button>
                        </div>
                    </div>


                </ReactModal>
            </div>
        );
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

export default connect(mapStateToProps, { getTuts })(Modal)