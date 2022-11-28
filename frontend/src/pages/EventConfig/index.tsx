import { useState, useEffect } from 'react';
import { MainContainer } from '../../components/MainContainer';
// import PermissionsGate from '../../helpers/PermissionsGate';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigBar, ConfigMenu, ConfigToggle, Container } from './styles';
import { AiFillCaretRight } from 'react-icons/ai';
import { EventData } from './ConfigPages/EventData';
import { configMenus, IConfigMenuItem } from './configMenus';
import { IoSettings } from 'react-icons/io5';
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { useAppContext } from '../../hooks/useAppContext';
import { EventDetails } from './ConfigPages/EventDetails';
import { EventBannerAndCard } from './ConfigPages/EventBannerAndCard';

const EventConfig = () => {

    const location = useLocation();
    const { eventsDispatch } = useAppContext();
    const [configPage, setConfigPage] = useState<IConfigMenuItem>(configMenus[0]);
    const [showConfigBar, setShowConfigBar] = useState(false);
    const eventCreation = location.pathname === "/event/new" ? true : false;

    function isActiveConfigPage(config_menu_idx: number) {
        return configPage.title === configMenus[config_menu_idx]?.title
    }

    function changeConfigPage(config: IConfigMenuItem) {
        if (showConfigBar) setShowConfigBar(false);
        if (eventCreation) return;
        setConfigPage(config)
    }

    useEffect(() => {
        return () => {
            eventsDispatch({ type: "events/reset-selected" });
        }
    }, [])

    return (
        <MainContainer>
            <Container>
                <ConfigToggle
                    showConfigBar={showConfigBar}
                    onClick={() => setShowConfigBar(true)}
                >
                    <IoSettings size="1.5rem" />
                </ConfigToggle>
                <div id="header">
                    <h1>{eventCreation ? "Novo Evento" : "Configurações do Evento"}</h1>
                </div>
                <div id="body">
                    <aside className="config-area">
                        <ConfigBar>
                            {
                                configMenus.map((item, idx) => {
                                    return (
                                        <ConfigMenu
                                            key={idx}
                                            active={isActiveConfigPage(idx)}
                                            onClick={() => changeConfigPage(item)}
                                            disabled={(eventCreation === true && item.title !== "Dados do Evento") ? true : false}
                                        >
                                            {item.title} {isActiveConfigPage(idx) ? <AiFillCaretRight /> : <item.Icon />}
                                        </ConfigMenu>
                                    )
                                })
                            }
                        </ConfigBar>
                    </aside>
                    <Drawer placement="left" onClose={() => setShowConfigBar(false)} isOpen={showConfigBar}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody padding={0} bgColor="#ECEFF1">
                                {
                                    configMenus.map((item, idx) => {
                                        return (
                                            <ConfigMenu
                                                key={idx}
                                                active={isActiveConfigPage(idx)}
                                                onClick={() => changeConfigPage(item)}
                                                disabled={eventCreation && item.title === "Dados do Evento"}
                                            >
                                                {item.title} {isActiveConfigPage(idx) ? <AiFillCaretRight /> : <item.Icon />}
                                            </ConfigMenu>
                                        )
                                    })
                                }
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                    <div className="form-area">
                        <div className="form-title">
                            {configPage.title} <configPage.Icon />
                        </div>
                        {
                            (() => {
                                switch (configPage.title) {
                                    case "Dados do Evento":
                                        return <EventData />;
                                    case "Detalhes do Evento":
                                        return <EventDetails />;
                                    case "Banner e Capa":
                                        return <EventBannerAndCard />;
                                    case "Parametros":
                                        return <EventData />;
                                    case "Categorias":
                                        return <EventData />;
                                    case "Planos":
                                        return <EventData />;
                                    case "Lotes":
                                        return <EventData />;
                                    case "Tags do Evento":
                                        return <EventData />;
                                    case "Cupons":
                                        return <EventData />;
                                    case "Campos Complementares":
                                        return <EventData />;
                                    default:
                                        return <EventData />;
                                }
                            })()
                        }
                    </div>
                </div>
            </Container>
        </MainContainer >
    );
}

export { EventConfig };