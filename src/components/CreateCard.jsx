import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateCard.css'
import {useHref} from "react-router-dom";

function CreateCard() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [bucketId, setBucketId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [card, setCard] = useState(null);

    const savedBucketId = localStorage.getItem('bucketId');
    console.log(savedBucketId, 'hiiii');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!savedBucketId) {
            alert("No bucket found! Please create a bucket first.");
            return;
        }
        if (!name) {
            alert("Please enter a card name.");
            return;
        }

        setLoading(true);
        setError('');

        const cardData = {
            name: name,
            link: link,
            bucketId: bucketId,
        };

        try {
            const response = await axios.post('http://localhost:8082/cards', cardData);
            setCard(response.data);
            const cardId = response.data.cardId;
            sessionStorage.setItem('cardId', cardId);
            localStorage.setItem('cardId', cardId)
            console.log('Card created successfully:', response.data);
            alert('Card created successfully!');
            window.location.href = "/delete_card";
            console.log(sessionStorage, 'hiiii')

        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    return (
        <div className="CreateCardContainer">
            <h1>Create New Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Card Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter card name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Card Link:</label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter card link"
                        required
                    />
                </div>

                <button type="submit">Create Card</button>
            </form>

            {card && (
                <div className="product-details">
                    <h2>Created Product:</h2>
                    <p><strong>Name:</strong> {card.name}</p>
                    <p><strong>Category:</strong> {card.link}</p>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default CreateCard;
