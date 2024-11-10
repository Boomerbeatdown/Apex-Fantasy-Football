// src/components/SomeComponent.js
import React, { useState } from 'react';
import Spinner from './Spinner';

const SomeComponent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Simulate an API call with a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            // API call logic here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Spinner />}
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    );
};

export default SomeComponent;
