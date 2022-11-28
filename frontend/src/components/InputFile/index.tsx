import { Button } from '@chakra-ui/react';
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { MdFilePresent } from 'react-icons/md';
import { Container } from './styles';

interface IInputFileProps extends InputHTMLAttributes<HTMLInputElement> {
    customTitle?: string;
    buttonSize?: string;
    onFileChange?: (files: File[]) => void;
}

const InputFile = ({ onFileChange, buttonSize, customTitle, accept, ...props }: IInputFileProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    function toggleFilePicker() {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    }

    function cleanFilePicker() {
        if (inputRef.current !== null) {
            inputRef.current.value = "";
            setFiles([]);
        }
    }

    function onChoose(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files !== undefined && event.target.files !== null) {
            setFiles(Array.from(event.target.files).map(item => item))
        }
    }

    useEffect(() => {
        onFileChange ? onFileChange(files) : null;
    }, [files])

    return (
        <Container>
            <input
                {...props}
                ref={inputRef}
                className="input-hidden"
                type="file"
                accept={accept}
                onChange={onChoose}
            />
            <Button
                size={buttonSize ? buttonSize : "sm"}
                rightIcon={<MdFilePresent />}
                colorScheme='messenger'
                onClick={toggleFilePicker}
            >
                {customTitle ? customTitle : "Escolher arquivo"}
            </Button>
            <div className="placeholder">
                {
                    (inputRef.current !== null && inputRef.current.files !== null && inputRef.current.files.length > 0) ?
                        files.map((item, idx) => {
                            return (
                                <span key={idx}>
                                    {idx > 0 ? ", " : ""}{item.name}
                                </span>
                            )
                        })
                        :
                        <>Nenhum arquivo selecionado...</>
                }
            </div>
            <Button
                onClick={cleanFilePicker}
                size="sm"
                className="clean-buttom"
                colorScheme='gray'
                variant='ghost'
                bgColor="#FFF"
            >
                Limpar campo
            </Button>
        </Container>
    );
}

export { InputFile };
