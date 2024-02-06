import { ProfileButton } from './ProfileButton';
import headerStyles from './css/header.module.css';

export function Header() {

    return (
        <header className={headerStyles.header}>
            <a href="/" className={headerStyles.logo} aria-label="link to main page">
                <img src="/logo.png" alt="eggTyper logo" width={36} height={36} />
                eggTyper
            </a>

            <div className={headerStyles.right}>
                <ProfileButton />
            </div>
        </header>
    );
}
