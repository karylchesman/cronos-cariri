import { useEffect } from 'react';
import { Container } from './styles';
import { TbArrowNarrowUp, TbArrowNarrowDown } from 'react-icons/tb';
import { HiOutlineMinus } from 'react-icons/hi';

interface ISpanOrderIconProps {
    orderByCurrent: {
        order_by: string;
        order: "ASC" | "DESC";
    };
    fieldName: string;
    fieldDisplayName: string;
    setOrderFunction: (order_by: string) => void;
}

const SpanOrderIcon = ({ orderByCurrent, fieldName, fieldDisplayName, setOrderFunction }: ISpanOrderIconProps) => {
    return <Container onClick={() => setOrderFunction(fieldName)}>
        {fieldDisplayName}&nbsp;
        {
            (() => {
                if (orderByCurrent.order_by === fieldName) {
                    switch (orderByCurrent.order) {
                        case "ASC":
                            return <TbArrowNarrowUp size="1rem" />
                        case "DESC":
                            return <TbArrowNarrowDown size="1rem" />
                        default:
                            return <HiOutlineMinus size="1rem" />
                    }
                }

                return <HiOutlineMinus size="1rem" />
            })()
        }
    </Container>
}

export { SpanOrderIcon };
