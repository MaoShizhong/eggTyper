const themeProperties = [
    '--header',
    '--background',
    '--words-box',
    '--text-main',
    '--text-faded',
    '--text-header',
    '--text-words-box',
    '--input-border',
] as const;
type ThemeProperties = (typeof themeProperties)[number];
export type Theme = Record<ThemeProperties, string>;

type Themes = { [key: string]: Theme };
export const THEMES = {
    Cappuccino: {
        '--header': '#2c2121',
        '--background': '#fff4e6',
        '--words-box': '#3c2f2f',
        '--text-main': '#854442',
        '--text-faded': '#854442a2',
        '--text-header': '#fff4e6',
        '--text-words-box': '#e4d2c2',
        '--input-border': '1px solid #be9b7b',
    },
    Midnight: {
        '--header': '#101013',
        '--background': '#17171D',
        '--words-box': '#FAEBD72F',
        '--text-main': '#DDDDDD',
        '--text-faded': '#444444',
        '--text-header': '#DDDDDD',
        '--text-words-box': '#DDDDDD',
        '--input-border': 'none',
    },
} satisfies Themes;
export type ThemeName = keyof typeof THEMES;
