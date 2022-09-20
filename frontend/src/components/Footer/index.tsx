import { Container, Content, FooterLine } from './styles';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';

const Footer = () => {

    return (
        <Container>
            <FooterLine />
            <Content>
                <span className="text-bold">Copyright © 2015 - 2019 - Cronos Cariri.</span> Todos os direitos reservados.
            </Content>
        </Container>
    );
}

export { Footer };
