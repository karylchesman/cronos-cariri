import React from 'react';
import { MainContainer } from '../../components/MainContainer';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';
import PermissionsGate from '../../helpers/PermissionsGate';

const EventConfig = () => {

    const pageNavigator = useNavigate();

    return (
        <MainContainer>
            <Container>
                <h1>Event Config</h1>
            </Container>
        </MainContainer>
    );
}

export { EventConfig };