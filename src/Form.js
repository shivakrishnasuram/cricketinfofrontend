import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Form = () => {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                'your_service_id', // Replace with your EmailJS Service ID
                'your_template_id', // Replace with your EmailJS Template ID
                formData,
                'your_user_id' // Replace with your EmailJS User ID
            )
            .then(
                (result) => {
                    setResponseMessage('Email sent successfully!');
                    setFormData({ name: '', message: '' }); // Clear form
                },
                (error) => {
                    setResponseMessage('Error sending email. Please try again later.');
                    console.error('Error:', error);
                }
            );
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    ></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Form;
