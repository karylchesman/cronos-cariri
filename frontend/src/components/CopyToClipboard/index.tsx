import { useState, useEffect } from 'react';
import { BsClipboardCheck, BsClipboardPlus } from 'react-icons/bs';
import { Container } from './styles';

interface ICopyToClipboardProps {
    text: string;
}

const CopyToClipboard = ({ text }: ICopyToClipboardProps) => {

    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
    }

    useEffect(() => {
        if (copied === true) {
            const interval = setTimeout(() => {
                setCopied(false);
            }, 3000)

            return () => {
                clearTimeout(interval);
            }
        }
    }, [copied])

    return (
        <Container onClick={onCopy} active={copied}>
            {text}
            {
                copied === true ?
                    <BsClipboardCheck />
                    :
                    <BsClipboardPlus />
            }
        </Container>
    );
}

export { CopyToClipboard };
