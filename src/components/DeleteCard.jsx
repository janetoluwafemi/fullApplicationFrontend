import React, { useState, useEffect } from 'react';
import '../styles/DeleteCard.css'
import axios from 'axios';

function DeleteCard() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // const [cardId, setCardId] = useState('');

    const savedCardId = localStorage.getItem('cardId');
    console.log(savedCardId, "hiiii")

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!savedCardId) {
            alert("Id not set");
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // const response = await axios.delete(`http://localhost:8082/deleted/${sessionStorage.getItem('cardId')}`);
            // setMessage(response.data.message);
            const url = `http://localhost:8082/deleted/${savedCardId}`;
            console.log('Making API request to:', url);

            const response = await axios.delete(url);
            console.log('API Response:', response);
            if (response.status === 200) {
                setMessage('Card deleted successfully.');
                console.log('Card deleted successfully:', response);
            }
        } catch (error) {
            console.error('There was an error deleting the card!', error);
            setError('Failed to delete the card. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="delete-card-container">
            <h1>Delete Card</h1>
            <form onSubmit={handleDelete} className="delete-card-form">
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Card'}
                </button>
            </form>
        </div>
    );
}

export default DeleteCard;
