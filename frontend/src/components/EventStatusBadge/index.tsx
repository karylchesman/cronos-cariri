import { Badge } from '@chakra-ui/react';
import { EEventStatus } from '../../pages/Events';
// import { Container } from './styles';

interface IEventStatusBadgeProps {
    status: EEventStatus;
}

const EventStatusBadge = ({ status }: IEventStatusBadgeProps) => {

    switch (EEventStatus[status]) {
        case "Publicado":
            return <Badge colorScheme='green'>{EEventStatus[status]}</Badge>;
        case "Não Publicado":
            return <Badge colorScheme='yellow'>{EEventStatus[status]}</Badge>;
        case "Cancelado":
            return <Badge colorScheme='red'>{EEventStatus[status]}</Badge>;
        default:
            return <Badge>Status Inválido</Badge>;
    }
}

export { EventStatusBadge };
