import { useState } from 'react';
import { ButtonUserNotLogged, Container, MenusItem, MenusWrapper } from './styles';
import { Button } from '@chakra-ui/react';
import cronosLogo from '../../assets/cronos-logo.png';

import { FaClipboardCheck, FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import { MdEventAvailable, MdLogin } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from '@chakra-ui/react'
import { SideBar } from '../SideBar';
import { useAppContext } from '../../hooks/useAppContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    const pageNavigator = useNavigate();
    const { user, handleLogOut } = useAppContext();

    const menus = [
        {
            name: "Quem somos",
            url: "/quemsomos",
        },
        {
            name: "Serviços",
            url: "/servicos",
        },
        {
            name: "Contrate",
            url: "/contrate",
        },
        {
            name: "Calendário",
            url: "/calendario",
        },
        {
            name: "Contato",
            url: "/contato",
        },
        {
            name: "Inscreva-se",
            url: "/inscrevase",
        }
    ]

    return (
        <Container>
            <div id="box">
                <div id="logo">
                    <img src={cronosLogo} alt="Cronos Logo" onClick={() => {
                        if (window.location.pathname !== "/") {
                            pageNavigator("/")
                        }
                    }} />
                </div>
                <div id="menu-bar">
                    <MenusWrapper>
                        {
                            menus.map((item, idx) => {
                                return (
                                    <MenusItem active={window.location.pathname === item.url} key={idx}>
                                        {item.name}
                                    </MenusItem>
                                )
                            })
                        }
                    </MenusWrapper>
                    <div className="user-icon">
                        {
                            user !== null ?
                                <>
                                    <Menu placement='bottom-end'>
                                        <MenuButton>
                                            <FaUserCircle size={32} color="#FFF" />
                                        </MenuButton>
                                        <MenuList rootProps={{ zIndex: 11 }}>
                                            <MenuItem><FaUserAlt />&nbsp;Perfil</MenuItem>
                                            <MenuItem><MdEventAvailable />&nbsp;Meus Eventos</MenuItem>
                                            <MenuItem><FaClipboardCheck />&nbsp;Minhas Inscrições</MenuItem>
                                            <MenuDivider />
                                            <MenuItem onClick={handleLogOut}><CgLogOut />&nbsp;Sair</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                                :
                                <ButtonUserNotLogged onClick={() => pageNavigator("/login")}>
                                    <MdLogin size={22} />&nbsp;Entrar
                                </ButtonUserNotLogged>
                        }
                    </div>

                    <div className="hambuger-menu">
                        <Button colorScheme='gray' variant='solid' onClick={() => setShowSideBar(true)}>
                            <GiHamburgerMenu size={20} />
                        </Button>
                    </div>
                </div>
            </div>
            <SideBar show={showSideBar} setShow={setShowSideBar} menus={menus} />
        </Container>
    );
}

export { NavBar };
