import { ProfileButton } from './ProfileButton';
import { ThemeButton } from './ThemeButton';
import headerStyles from './css/header.module.css';

type HeaderProps = {};

export function Header({}: HeaderProps) {
    return (
        <header className={headerStyles.header}>
            <a href="/" className={headerStyles.logo} aria-label="link to main page">
                <img src="/logo.png" alt="eggTyper logo" width={36} height={36} />
                eggTyper
            </a>

            <div className={headerStyles.right}>
                <ThemeButton />
                <ProfileButton />
            </div>
        </header>
    );
}
