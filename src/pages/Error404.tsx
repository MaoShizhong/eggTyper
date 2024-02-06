import { Link } from 'react-router-dom';

export function Error404() {
    return (
        <div>
            <h1>404 page not found</h1>
            <Link to="/">Return to homepage</Link>
        </div>
    );
}
