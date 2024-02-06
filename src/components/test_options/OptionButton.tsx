import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { formatLabel } from '../../helpers/util';
import { TestOptions } from '../../types/types';
import { TestOptionCategory } from './Options';
import optionsStyles from './css/options.module.css';

type OptionButtonProps = {
    category: TestOptionCategory;
    fileName: string;
    selectedTestOptions: TestOptions;
    setSelectedTestOptions: Dispatch<SetStateAction<TestOptions>>;
    isDefault: boolean;
};

export function OptionButton({
    category,
    fileName,
    selectedTestOptions,
    setSelectedTestOptions,
}: OptionButtonProps) {
    const { type, capitals, numbers } = selectedTestOptions;
    const isChecked = fileName === type || fileName === capitals || fileName === numbers;
    const isDisabled = type === 'quotes' && category !== 'type';

    const svgClasses = [];
    if (isChecked) svgClasses.push(optionsStyles.selected);
    if (isDisabled) svgClasses.push(optionsStyles.disabled);

    function selectTestOption(e: ChangeEvent<HTMLInputElement>): void {
        setSelectedTestOptions({
            ...selectedTestOptions,
            [category]: e.currentTarget.value,
        });
    }

    return (
        <>
            <label className={optionsStyles.option} htmlFor={fileName}>
                <svg className={svgClasses.join(' ')}>
                    <use href={`/option_SVGs/${fileName}.svg#svg`} />
                </svg>

                {formatLabel(fileName)}

                <input
                    id={fileName}
                    className={optionsStyles.radio}
                    type="radio"
                    name={category}
                    aria-label={formatLabel(fileName)}
                    value={fileName}
                    disabled={isDisabled}
                    checked={isChecked}
                    onChange={selectTestOption}
                    required
                />
            </label>
        </>
    );
}
