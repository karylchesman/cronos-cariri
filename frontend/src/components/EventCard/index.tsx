import { Container } from './styles';
import { Button } from '@chakra-ui/react';

interface IEventCardProps {
    eventData: {
        banner_url: string;
    }
}

const EventCard = ({ eventData }: IEventCardProps) => {


    return (
        <Container backgroundImage={eventData.banner_url}>
            <div id="background-image">

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
