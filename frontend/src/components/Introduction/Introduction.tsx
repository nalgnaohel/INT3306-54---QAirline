import React from 'react';
import './Introduction.css';
//Khoi text Introduction cua QAirline
const Introduction: React.FC = () => {
    return (
        <div className='intro-div'>
            <p>WELCOME TO</p>
            <h1>QAIRLINE</h1>
            <p>Book your travel and enjoy luxury redefined at the most affordable rates.</p>
        </div>
    );
}

export default Introduction;