import { Container } from './styles';
import { Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BsCalendar2EventFill } from 'react-icons/bs';

interface IEventCardProps {
    eventData: {
        card_url: string;
    }
}

const EventCard = ({ eventData }: IEventCardProps) => {

    return (
        <Container backgroundImage={eventData.card_url}>
            <div id="background-image" />
            <div className="event-date">
                <div className="date">
                    <span><BsCalendar2EventFill /></span>
                    <span>{dayjs().format("DD/MM")}</span>
                </div>
            </div>
            <div id="event-info">
                <div className="name">
                    Nome do evento
                </div>
                <div className="subscription">
                    <Button variant="solid" colorScheme="twitter">Detalhes</Button>
                    <Button colorScheme="teal">Inscreva-se</Button>
                </div>
            </div>
        </Container >
    );
}

export { EventCard };
