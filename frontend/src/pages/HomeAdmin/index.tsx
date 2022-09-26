import React from 'react';
import { Divider, Text } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container, MenuItem, MenuTitle, MenuWrapper } from './styles';
import { IoPeopleSharp } from 'react-icons/io5';
import { FaUserShield } from 'react-icons/fa';
import { GiCarousel } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

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
                            <MenuItem onClick={() => pageNavigator("/admin/users")}>
                                <FaUserShield size="5rem" />&nbsp;<span>Usuários</span>
                            </MenuItem>
                            <MenuItem>
                                <IoPeopleSharp size="5rem" />&nbsp;<span>Pessoas</span>
                            </MenuItem>
                        </MenuWrapper>
                    </div>
                    <div className="system">
                        <MenuTitle>
                            <Text fontSize='2xl'>Sistema</Text>
                        </MenuTitle>
                        <MenuWrapper>
                            <MenuItem>
                                <GiCarousel size="5rem" />&nbsp;<span>Carrousel</span>
                            </MenuItem>
                        </MenuWrapper>
                    </div>
                </div>
            </Container>
        </MainContainer>
    );
}

export { HomeAdmin };