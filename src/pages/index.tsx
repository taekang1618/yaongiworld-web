import React from 'react';
import ExampleComponent from '../components/ExampleComponent';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Yaongi World!</h1>
            <p>This is the home page.</p>
            <ExampleComponent />
        </div>
    );
};

export default Home;