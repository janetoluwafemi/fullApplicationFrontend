import React from 'react';
import image from '../images/images.jpeg'
import '../styles/Index.css'
import {Link} from "react-router-dom";

function Index() {

    return (
        <div className="App">
            <div className="row">
                <nav className={}>
                    <ul>
                        <li><Link to="/about-us" className="join">About Us</Link></li>
                        <li><Link to="/sign-up" className="signUp">Sign Up</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="text">
                <h1>A Card App</h1>
                <div className="text2">
                    <h3>Add more,</h3>
                    <h3>Save more</h3>
                </div>
            </div>
            <div className="image">
                <img src={image}/>
            </div>
        </div>
    )
}

export default Index;