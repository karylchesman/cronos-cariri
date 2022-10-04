import { useState } from 'react';

type IUseModalControlReturn<D> = [
    boolean,
    D,
    (data?: D) => void
]

export function useModalControl<D>() {
    const [modalData, setModalData] = useState<D | null>(null);
    const [show, setShow] = useState(false);

    const turnModal = (data?: D) => {
        if (data !== undefined) {
            setModalData(data);
        }else{
            setModalData(null);
        }

        setShow((state) => !state);
    }

    return [
        show,
        modalData,
        turnModal
    ] as IUseModalControlReturn<D>
}