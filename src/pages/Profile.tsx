import { useParams } from 'react-router-dom';

type ProfileProps = {};

export function Profile({}: ProfileProps) {
    const { username } = useParams();
    return <main>Profile: {username}</main>;
}
