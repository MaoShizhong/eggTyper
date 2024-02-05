import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { ROWS } from '../../helpers/constants';
import { useRowCapacity } from '../../helpers/hooks';
import { toRows } from '../../helpers/util';
import { WordScroll } from '../../types/types';
import { Char } from './Char';
import testStyles from './css/test.module.css';

type WordsProps = {
    words: string;
    inputChars: string;
    setWordScroll: Dispatch<SetStateAction<WordScroll>>;
    fontSize: number;
};

export function Words({ words, inputChars, setWordScroll, fontSize }: WordsProps) {
    const rowContainerRef = useRef<HTMLDivElement>(null);
    const lineHeight = fontSize * 1.5;
    const rowCapacity = useRowCapacity(rowContainerRef, fontSize);
    const rowedChars = toRows(words, rowCapacity);
    const rowedInputChars = toRows(inputChars, rowCapacity, rowedChars);

    useEffect((): void => {
        setWordScroll({
            firstRowLength: rowedChars[0].length,
            scrollPoint: rowedChars[0].length + rowedChars[1].length + rowedChars[2].length - 1,
        });
    }, [rowedChars, setWordScroll]);

    return (
        <div className={testStyles.wordsContainer}>
            <div
                ref={rowContainerRef}
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    height: `${ROWS * lineHeight}px`,
                }}
            >
                {rowedChars.map(
                    (row, i): JSX.Element => (
                        <div key={i}>
                            {row.map((char, j): JSX.Element => {
                                const previousRowFull =
                                    i > 0
                                        ? rowedChars[i - 1].length ===
                                          rowedInputChars[i - 1]?.length
                                        : true;
                                const isCurrentLetter =
                                    j === (rowedInputChars[i]?.length ?? 0) && previousRowFull;
                                const isScored = j < rowedInputChars[i]?.length;
                                const isCorrect = rowedInputChars[i]?.[j] === char;

                                return (
                                    <Char
                                        key={j}
                                        char={char}
                                        isCurrentLetter={isCurrentLetter}
                                        isScored={isScored}
                                        isCorrect={isCorrect}
                                    />
                                );
                            })}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
