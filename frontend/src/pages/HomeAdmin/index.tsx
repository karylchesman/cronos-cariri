import React from 'react';
import { Text } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { FaUserFriends, FaUserShield } from 'react-icons/fa';
import { GiCarousel } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { BsCalendar2WeekFill } from 'react-icons/bs';
import { Container, MenuItem, MenuTitle, MenuWrapper } from './styles';
import PermissionsGate from '../../helpers/PermissionsGate';

const HomeAdmin = () => {

    const pageNavigator = useNavigate();

    return (
        <MainContainer>
            <Container>
                <div id="header">
                    <h1>Painel Administrador</h1>
                </div>
                <div id="body">
                    <div className="registers">
                        <MenuTitle>
                            <Text fontSize='2xl'>Cadastros</Text>
                        </MenuTitle>
                        <MenuWrapper>
                            <PermissionsGate permissions={["USER_LIST"]}>
                                <MenuItem onClick={() => pageNavigator("/admin/users")}>
                                    <FaUserFriends size="2rem" />&nbsp;<span>Usuários</span>
                                </MenuItem>
                            </PermissionsGate>

                            <PermissionsGate permissions={["ROLE_LIST"]}>
                                <MenuItem onClick={() => pageNavigator("/admin/roles")}>
                                    <FaUserShield size="2rem" />&nbsp;<span>Perfis de Acesso</span>
                                </MenuItem>
                            </PermissionsGate>

                            <PermissionsGate>
                                <MenuItem onClick={() => pageNavigator("/admin/events")}>
                                    <BsCalendar2WeekFill size="2rem" />&nbsp;<span>Eventos</span>
                                </MenuItem>
                            </PermissionsGate>
                        </MenuWrapper>
                    </div>
                    <div className="system">
                        <MenuTitle>
                            <Text fontSize='2xl'>Sistema</Text>
                        </MenuTitle>
                        <MenuWrapper>
                            <PermissionsGate permissions={["CARROUSEL_LIST"]}>
                                <MenuItem>
                                    <GiCarousel size="2rem" />&nbsp;<span>Carrousel</span>
                                </MenuItem>
                            </PermissionsGate>
                        </MenuWrapper>
                    </div>
                </div>
            </Container>
        </MainContainer>
    );
}

export { HomeAdmin };