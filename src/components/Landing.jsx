import React, { Component } from 'react'
import Anime from 'react-anime'


export default class Lander extends Component {
    render() {
        return (
        
       
            <div className="landBack">

                <div className='main-land'>
                 <Anime easing="easeInSine"
         duration={5000}
         direction="alternate"
         loop={true}
         delay={(el, index) => index * 300}
         translateY='10rem'
         scale={[.25, .9]}>
                <div className='top-head'>
                    
                    <h1>Learning Resource Center</h1>

                </div>
                <div className='land-para'>
                    <h4>Log in to begin your Ascent</h4>

                </div>
                </Anime>
                <div className="landerBox">

                    <a href="http://138.197.196.116:3002/auth"><button className='login-button'>Login</button></a>

                </div>
                </div>

            </div>
            
        )
    }
}