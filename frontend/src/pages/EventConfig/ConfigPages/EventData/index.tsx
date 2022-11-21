import { useState } from 'react';
import { Container } from './styles';
// import PermissionsGate from '../../helpers/PermissionsGate';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const EventData = () => {
    const location = useLocation();
    const eventCreation = location.pathname === "/event/new" ? true : false;

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    {
                        eventCreation ?
                            "Para poder configurar demais parametros do evento, você primeiramente deve preencher o formulário abaixo e criá-lo."
                            :
                            "Nesta página você pode editar as principais informações do evento."
                    }
                </Alert>
            </div>
            <div className="form">

            </div>
        </Container>
    );
}

export { EventData };