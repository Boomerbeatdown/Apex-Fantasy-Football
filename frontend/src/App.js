// src/App.js

import React from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    // Example of accessing Redux state
    const exampleState = useSelector((state) => state.example);

    return (
        <div>
            <h1>Welcome to Redux Setup!</h1>
            <p>{exampleState.example}</p> {/* Displaying the example state */}
        </div>
    );
};

export default App;
