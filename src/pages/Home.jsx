import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    // todo: if not logged in, go to login page.
    return (
        <div>
            <h1>Welcome to the Project and Task Manager</h1>
            <p>
                Manage your projects and tasks efficiently. Navigate to the sections using the links above.
            </p>
            <div>
                <Link to="/projects" style={{ marginRight: '10px' }}>View Projects</Link>
                <Link to="/time-entries">View Time Entries</Link>
            </div>
        </div>
    );
}

export default Home;
