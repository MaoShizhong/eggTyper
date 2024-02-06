import { Dispatch, FormEvent, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { TestOptions, allTestOptions } from '../../types/types';
import { OptionButton } from './OptionButton';
import optionsStyles from './css/options.module.css';

type OptionsProps = {
    testOptions: TestOptions;
    setTestOptions: Dispatch<SetStateAction<TestOptions>>;
};
export type ModalTestOptions = Omit<TestOptions, 'duration'>;
export type TestOptionCategory = keyof ModalTestOptions;

export function Options({ testOptions, setTestOptions }: OptionsProps) {
    const { duration: _, ...modalTestOptions } = testOptions;
    const [selectedTestOptions, setSelectedTestOptions] =
        useState<ModalTestOptions>(modalTestOptions);
    const modalRef = useRef<HTMLDialogElement>(null);

    function toggleOptionsModal(): void {
        modalRef.current?.showModal();
    }

    function closeOnClickOutside(e: MouseEvent): void {
        if (e.target === modalRef.current) modalRef.current.close();
    }

    function changeTestType(e: FormEvent): void {
        e.preventDefault();
        setTestOptions({ ...testOptions, ...selectedTestOptions });
        modalRef.current?.close();
    }

    return (
        <>
            <button onClick={toggleOptionsModal}>TestOptions</button>

            <dialog className={optionsStyles.modal} onClick={closeOnClickOutside} ref={modalRef}>
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
