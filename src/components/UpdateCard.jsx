import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCard({ onUpdate }) {
    const [cardData, setCardData] = useState({ name: '', link: '' });
    const [cardId, setCardId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [card, setCard] = useState(null);

    useEffect(() => {
        const storedCardId = localStorage.getItem('cardId');
        if (storedCardId) {
            setCardId(storedCardId);
            fetchCard(storedCardId);
        } else {
            setError("Card ID is missing.");
        }
    }, []);

    const fetchCard = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8082/cards/${id}`);
            setCardData({ name: response.data.name, link: response.data.link });
        } catch (error) {
            console.error('Error fetching card:', error);
            setError('Failed to fetch card data.');
        }
    };

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

        if (!cardData.name || !cardData.link) {
            setError("Both card name and link are required.");
            setLoading(false);
            return;
        }

        const updatedCard = { name: cardData.name, link: cardData.link };
        try {
            const response = await axios.put(`http://localhost:8082/cards/${cardId}`, updatedCard);
            setCard(response.data);
            setMessage('Card updated successfully!');
            localStorage.setItem('cardId', cardId);
            onUpdate();
            setCardData({ name: '', link: '' });
        } catch (error) {
            console.error('There was an error updating the card!', error);
            // setError('Failed to update the card. Please try again.');
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

            {card && (
                <div className="product-details">
                    <h2>Updated Product:</h2>
                    <p><strong>Name:</strong> {card.name}</p>
                    <p><strong>Link:</strong> {card.link}</p>
                </div>
            )}
        </div>
    );
}

export default UpdateCard;
