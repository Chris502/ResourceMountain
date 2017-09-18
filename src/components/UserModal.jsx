import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import axios from 'axios'




class UserModal extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            tutCount: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getCount = this.getCount.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    getCount = (id) => {
        axios.get('/allTuts/' + id).then(response => {
            console.log("HERE I AM" + response.data[0])
            let byAdd = response.data
            this.setState({
                tutCount: byAdd[0].count
            })
            console.log(this.state.tutCount)
        })
    }


    closeModal() {
        this.setState({
            modalIsOpen: false,
            tutCount: ''
        });
    }

    render() {
        const username = localStorage.getItem("user")
        const picc = localStorage.getItem("user-pic")
        const persID = ths.props.userID

        let stats = this.state.tutCount ? <h2><span className="user-span">User Uploads:</span> &nbsp; {this.state.tutCount}</h2> : <a className="user-item" onClick={_ => this.getCount(persID)}>
            Stats</a>





        console.log(persID)
        return (
            <div>
                <button onClick={this.openModal}>User Profile</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    className="Modal-user"
                    overlayClassName="Overlay"
                >
                    <div className="user-pic-box">
                        <img src={picc} alt='profile pic' className='UserPic' />
                    </div>
                    <div className="modal-username">
                        <h2><span className="user-span">User Name: </span> &nbsp;  {username}</h2>
                    </div>
                    <div className="stats-button">

                        {stats}
                    </div>
                    <div className="log-out">
                        <a href="/auth/logout" className='user-item'>Log Out</a>
                    </div>


                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        authName: state.authName,
        authPict: state.authPict,
        userID: state.userID
    }
}
export default connect(mapStateToProps)(UserModal)