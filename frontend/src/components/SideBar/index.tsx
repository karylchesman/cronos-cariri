import { Container, PageMenu } from './styles';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface ISideBarProps {
    show: boolean;
    setShow: (value: boolean) => void;
    menus?: {
        name: string;
        url: string;
    }[]
}

const SideBar = ({ setShow, show, menus }: ISideBarProps) => {
    const pageNavigator = useNavigate();

    function close() {
        setShow(false);
    }

    return (
        <Container show={show}>
            <Drawer onClose={close} isOpen={show} size="xs">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menus</DrawerHeader>
                    <DrawerBody>
                        {
                            menus !== undefined &&
                            menus.map((item, idx) => {
                                return (
                                    <PageMenu active={window.location.pathname === item.url} key={idx} onClick={()=> pageNavigator(item.url)}>
                                        <span>{item.name}</span>
                                    </PageMenu>
                                )
                            })
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Container>
    );
}

export { SideBar };
