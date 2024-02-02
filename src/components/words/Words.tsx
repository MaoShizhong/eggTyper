import { useRef } from 'react';
import { ROWS } from '../../helpers/constants';
import { useRowCapacity } from '../../helpers/hooks';
import { toRows } from '../../helpers/util';
import { TestType } from '../../types/types';
import { Char } from './Char';
import testStyles from './css/test.module.css';

type WordsProps = {
    testType: TestType;
    words: string;
    inputChars: string;
    fontSize: number;
};

export function Words({ testType, words, inputChars, fontSize }: WordsProps) {
    const rowContainerRef = useRef<HTMLDivElement>(null);
    const lineHeight = fontSize * 1.5;
    const rowCapacity = useRowCapacity(rowContainerRef, fontSize);
    const rowedChars = toRows(words, rowCapacity);
    const rowedInputChars = toRows(inputChars, rowCapacity, rowedChars);

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
                            {row.map((char, j, rowChars): JSX.Element => {
                                const previousRowFull =
                                    i > 0
                                        ? rowedChars[i - 1].length ===
                                          rowedInputChars[i - 1]?.length
                                        : true;
                                const isCurrentLetter =
                                    j === (rowedInputChars[i]?.length ?? 0) && previousRowFull;
                                const isScored = j < rowedInputChars[i]?.length;
                                const isCorrect = rowedInputChars[i]
                                    ? rowedInputChars[i][j] === char
                                    : false;

                                return (
                                    <Char
                                        key={j}
                                        char={char}
                                        isCurrentLetter={isCurrentLetter}
                                        isScored={isScored}
                                        isCorrect={isCorrect}
                                        isMiddleRow={i === Math.floor(ROWS / 2)}
                                        isLastChar={!rowChars[j + 1]}
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
