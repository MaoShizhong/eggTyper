import { MouseEvent, RefObject } from 'react';
import { ONE_HOUR, ONE_MINUTE, ONE_SECOND } from './constants';

export function formatTime({
    time,
    withLetters = false,
    padMinutes = true,
}: {
    time: number;
    withLetters?: boolean;
    padMinutes?: boolean;
}): string {
    const hours = Math.floor(time / ONE_HOUR);
    const minutes = Math.floor((time - hours * ONE_HOUR) / ONE_MINUTE);
    const seconds = (time - hours * ONE_HOUR - minutes * ONE_MINUTE) / ONE_SECOND;

    let minutesString = minutes.toString();
    const secondsString = seconds.toString();

    if (withLetters) {
        let timeString = `${minutesString}m ${secondsString}s`;
        if (hours > 0) timeString = `${hours}h ${timeString}`;

        return timeString;
    }

    if (padMinutes) minutesString = minutesString.padStart(2, '0');

    let timeString = `${minutesString}:${secondsString.padStart(2, '0')}`;
    if (hours > 0) timeString = `${hours}:${timeString}`;

    return timeString;
}

export function toMaxOneDP(num: number): number {
    return Math.round(num * 10) / 10;
}

export function getContentWidth(element: HTMLElement): number {
    const styles = getComputedStyle(element);
    const inlinePadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    return element.offsetWidth - inlinePadding;
}

// input chars rely on rowed wordlist row lengths as breakpoints instead of max chars
export function toRows(words: string, rowMaxChars: number, rowedWordlist?: string[][]): string[][] {
    const rowedWordlistLengths = rowedWordlist?.map((row): number => row.length);
    let rowBreakpoint = rowedWordlistLengths ? rowedWordlistLengths[0] - 1 : rowMaxChars - 1;

    // hack for `.slice` in the last loop
    const indicesRowEndSpaces = [-1];
    let spaceIndex = 0;
    for (let i = 0; i < words.length; i++) {
        if (i > rowBreakpoint) {
            const toNextBreakpoint =
                rowedWordlistLengths?.[indicesRowEndSpaces.length] ?? rowMaxChars;
            rowBreakpoint = spaceIndex + toNextBreakpoint;
            indicesRowEndSpaces.push(spaceIndex);
        } else if (words[i] === ' ') {
            spaceIndex = i;
        }
    }

    const rowedChars: string[][] = [];
    for (let i = 1; i < indicesRowEndSpaces.length; i++) {
        const start = indicesRowEndSpaces[i - 1] + 1;
        const end = indicesRowEndSpaces[i] + 1;
        rowedChars.push(words.slice(start, end).split(''));
    }

    // get last chars in (not enough to fill a whole row)
    rowedChars.push(words.slice(indicesRowEndSpaces[indicesRowEndSpaces.length - 1] + 1).split(''));

    return rowedChars;
}

export function formatLabel(text: string): string {
    return `${text.charAt(0).toUpperCase()}${text.slice(1).replaceAll('_', ' ')}`;
}

export function closeOnClickOutside(e: MouseEvent, modalRef: RefObject<HTMLDialogElement>): void {
    if (e.target === modalRef.current) modalRef.current?.close();
}

export function openDialog({
    ref,
    isModal = false,
    forcePreventOpen = false,
}: {
    ref: RefObject<HTMLDialogElement>;
    isModal?: boolean;
    forcePreventOpen?: boolean; // prevent opening by removing button disabled in DOM
}): void {
    if (!ref.current || forcePreventOpen) return;

    if (isModal) ref.current.showModal();
    else ref.current.show();
}
