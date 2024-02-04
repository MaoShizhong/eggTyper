import { useEffect, useState } from 'react';
import testStyles from './css/test.module.css';

type CapsLockIndicatorProps = { toBeShown: boolean };

export function CapsLockIndicator({ toBeShown }: CapsLockIndicatorProps) {
    const [capsLockOn, setCapsLockOn] = useState(false);

    useEffect((): (() => void) => {
        function detectCapsLock(e: KeyboardEvent): void {
            if (e.code !== 'CapsLock') return;

            const capsLockIsOnBeforeKeyPress = e.getModifierState('CapsLock');
            setCapsLockOn(!capsLockIsOnBeforeKeyPress);
        }
        window.addEventListener('keydown', detectCapsLock);

        return (): void => window.removeEventListener('keydown', detectCapsLock);
    }, []);

    return (
        <>
            {toBeShown && capsLockOn && (
                <div className={testStyles.capsLock}>
                    <kbd>Caps lock</kbd> ON
                </div>
            )}
        </>
    );
}
