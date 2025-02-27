import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCard({ onUpdate }) {
    const [cardData, setCardData] = useState({ name: '', cardId: '', link: '' });
    const [cardId, setCardId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedCardId = localStorage.getItem('cardId');
        if (storedCardId) {
            setCardId(storedCardId);
        } else {
            setError("Card ID is missing.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setMessage('');

        if (!cardId) {
            setError("Card ID is missing.");
            setLoading(false);
            return;
        }

        const updatedCard = { name: cardData.name, link: cardData.link };
        if (!updatedCard.name || !updatedCard.link) {
            setError("Both card name and link are required.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8082/cards/${cardId}`, updatedCard);

            setMessage(response.data.message);
            sessionStorage.setItem('cardId', cardId);
            localStorage.setItem('cardId', cardId);
            console.log('Card updated successfully:', response.data);
            onUpdate();

        } catch (error) {
            console.error('There was an error updating the card!', error);
            setError('Failed to update the card. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Update Card {cardId}</h1>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Card Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={cardData.name}
                        onChange={(e) => setCardData(prevData => ({ ...prevData, name: e.target.value }))}
                        placeholder="Enter card name"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="link">Card Link:</label>
                    <input
                        type="text"
                        id="link"
                        value={cardData.link}
                        onChange={(e) => setCardData(prevData => ({ ...prevData, link: e.target.value }))}
                        placeholder="Enter card link"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Card'}
                </button>
            </form>
        </div>
    );
}

export default UpdateCard;
