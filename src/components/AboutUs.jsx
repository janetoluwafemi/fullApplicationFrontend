import React from 'react';
import {Link} from "react-router-dom";
import image1 from '../images/images (1).jpeg'
import '../styles/AboutUs.css'

function AboutUs() {
    return (
        <div className="AboutUscontainer">
            <div className="links">
                <nav>
                    <ul>
                        <li><Link to="/create_bucket" className="join">Create Bucket</Link></li>
                        <li><Link to="/create_card" className="signUp">Create Card</Link></li>
                        <li><Link to="/delete_card" className="join">Delete Card</Link></li>
                        <li><Link to="/update_card" className="signUp">Update Card</Link></li>
                        <li><Link to="/get_card_by_name" className="getCardByName">Get Card By Name</Link></li>
                    </ul>
                </nav>
            </div>
            <div>
                <img src={image1}/>
            </div>
            <div>
                <h1>A Card App</h1>
            </div>
            <div>
                <h3>
                    A app for saving card in a bucket, There is one bucket with three types, where you can store cards,
                </h3>
                <h3>
                    and you get to decide which type of bucket to use for storing the card.
                </h3>
            </div>
        </div>
    )
}

export default AboutUs