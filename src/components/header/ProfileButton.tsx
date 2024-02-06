import { Link } from 'react-router-dom';

type ProfileButtonProps = { username?: string };

export function ProfileButton({ username }: ProfileButtonProps) {
    return (
        <>
            {username ? (
                <Link to={`/${username}`}>{username}</Link>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Create account</Link>
                </>
            )}
        </>
    );
}
