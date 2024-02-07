import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import { closeOnClickOutside, openDialog } from '../../helpers/util';
import { TestOptions, allTestOptions } from '../../types/types';
import { OptionSelection } from './OptionSelection';
import optionsStyles from './css/options.module.css';

type OptionsProps = {
    testOptions: TestOptions;
    setTestOptions: Dispatch<SetStateAction<TestOptions>>;
    isButtonDisabled: boolean;
};
export type TestOptionCategory = keyof TestOptions;

export function Options({ testOptions, setTestOptions, isButtonDisabled }: OptionsProps) {
    const [selectedTestOptions, setSelectedTestOptions] = useState(testOptions);
    const modalRef = useRef<HTMLDialogElement>(null);

    function changeTestType(e: FormEvent): void {
        e.preventDefault();
        setTestOptions({ ...testOptions, ...selectedTestOptions });
        modalRef.current?.close();
    }

    return (
        <>
            <button
                className={optionsStyles.button}
                onClick={(): void =>
                    openDialog({ ref: modalRef, isModal: true, forcePreventOpen: isButtonDisabled })
                }
                disabled={isButtonDisabled}
            >
                Test options
            </button>

            <dialog
                className={optionsStyles.modal}
                onMouseDown={(e): void => closeOnClickOutside(e, modalRef)}
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
                                        <OptionSelection
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
