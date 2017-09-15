import React, { Component } from 'react'


export default class Lander extends Component {
    render() {
        return (
            <div className="landBack">

                <div className='main-land'>

                <div className='top-head'>

                    <h1>Learning Resource Center</h1>

                </div>
                <div className='land-para'>
                    <h4>Log in to begin your Ascent</h4>

                </div>

                <div className="landerBox">

                    <a href="http://localhost:3001/auth"><button className='login-button'>Login</button></a>

                </div>
                </div>
            </div>
        )
    }
}