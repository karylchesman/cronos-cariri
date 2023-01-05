import { Container, PayplansFlex } from './styles';
import { Alert, AlertIcon, Button, Spinner } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const EventPayplans = () => {
    const { events, eventsDispatch } = useAppContext();

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    Nesta seção você poderá cadastrar Planos de Pagamento para o evento.
                </Alert>
            </div>
            <div className="event-payplans">
                {false ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /> :
                    <>
                        <PayplansFlex>
                            {
                                Array.from({ length: 0 }).length > 0 ?
                                    Array.from({ length: 0 }).map((item, idx) => {
                                        return (
                                            <>Algum</>
                                        )
                                    })
                                    :
                                    <div className="no-payplans">
                                        <AiOutlineInfoCircle size="1.2rem" />
                                        Nenhum plano de pagamento cadastrado até o momento.
                                    </div>
                            }
                        </PayplansFlex>
                        <div className="actions">

                            <Button
                                onClick={() => { }}
                                type="button"
                                rightIcon={<BsPlusCircleDotted size="1.2rem" />}
                                colorScheme="teal"
                            >
                                Novo Plano
                            </Button>
                        </div>
                    </>
                }
            </div>
        </Container>
    );
}

export { EventPayplans };