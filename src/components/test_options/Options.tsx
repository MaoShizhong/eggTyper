import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import { closeOnClickOutside } from '../../helpers/util';
import { TestOptions, allTestOptions } from '../../types/types';
import { OptionButton } from './OptionButton';
import optionsStyles from './css/options.module.css';

type OptionsProps = {
    testOptions: TestOptions;
    setTestOptions: Dispatch<SetStateAction<TestOptions>>;
};
export type TestOptionCategory = keyof TestOptions;

export function Options({ testOptions, setTestOptions }: OptionsProps) {
    const [selectedTestOptions, setSelectedTestOptions] = useState(testOptions);
    const modalRef = useRef<HTMLDialogElement>(null);

    function toggleOptionsModal(): void {
        modalRef.current?.showModal();
    }

    function changeTestType(e: FormEvent): void {
        e.preventDefault();
        setTestOptions({ ...testOptions, ...selectedTestOptions });
        modalRef.current?.close();
    }

    return (
        <>
            <button className={optionsStyles.button} onClick={toggleOptionsModal}>
                Test options
            </button>

            <dialog
                className={optionsStyles.modal}
                onClick={(e): void => closeOnClickOutside(e, modalRef)}
                ref={modalRef}
            >
                <form className={optionsStyles.form} onSubmit={changeTestType}>
                    {Object.keys(allTestOptions).map((category): JSX.Element => {
                        const optionsCategory = category as TestOptionCategory;

                        return (
                            <fieldset key={category} className={optionsStyles.category}>
                                <legend>{`${category.charAt(0).toUpperCase()}${category.slice(1)}:`}</legend>

                                {allTestOptions[optionsCategory].map((option, i): JSX.Element => {
                                    return (
                                        <OptionButton
                                            key={option}
                                            category={optionsCategory}
                                            fileName={option}
                                            selectedTestOptions={selectedTestOptions}
                                            setSelectedTestOptions={setSelectedTestOptions}
                                            isDefault={i === 0}
                                        />
                                    );
                                })}
                            </fieldset>
                        );
                    })}

                    <div className={optionsStyles.buttons}>
                        <button type="button" onClick={(): void => modalRef.current?.close()}>
                            Cancel
                        </button>
                        <button type="submit">Apply</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
