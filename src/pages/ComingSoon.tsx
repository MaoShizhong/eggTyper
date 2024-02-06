import { Link } from 'react-router-dom';

type ComingSoonProps = { featureName: string };

export function ComingSoon({ featureName }: ComingSoonProps) {
    return (
        <main>
            <h1>{featureName} feature not yet implemented - coming soon!</h1>
            <Link to="/">Return to homepage</Link>
        </main>
    );
}
