import { Container, PayplansFlex } from './styles';
import { Alert, AlertIcon, Button, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiFillSetting, AiOutlineInfoCircle } from 'react-icons/ai';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { useEffect } from 'react';
import { PayPlanCard } from '../../../../components/PayPlanCard';
import PermissionsGate from '../../../../helpers/PermissionsGate';
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

export interface IPayPlan {
    id: string;
    name: string;
    event_id: string;
    banner_archive_id: string | null;
    elderly_discount: number | null;
    elderly_age: number | null;
    details: string;
    value: number | null;
    created_at: Date;
    updated_at: Date;
}
interface IRequestListPayPlansByEventReturn {
    payplans: IPayPlan[]
}

const EventPayplans = () => {
    const { events, eventsDispatch } = useAppContext();

    const {
        data: payPlansData,
        handleRequest: getPayPlans
    } = useApiRequest<IRequestListPayPlansByEventReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
    })

    useEffect(() => {
        if (events.selected.event !== null) {
            const controller = new AbortController();

            getPayPlans({
                url: `/payplans/${events.selected.event.id}/list`,
                signal: controller.signal
            })

            return () => {
                controller.abort()
            }
        }
    }, [])

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
                        <PayplansFlex>
                            {
                                payPlansData !== null && payPlansData.payplans.length > 0 ?
                                    payPlansData.payplans.map((item, idx) => {
                                        return (
                                            <PayPlanCard key={idx} payplanProps={item}>
                                                <Menu>
                                                    <MenuButton as={Button}>
                                                        <AiFillSetting />
                                                    </MenuButton>
                                                    <MenuList>
                                                        <PermissionsGate permissions={[]}>
                                                            <MenuItem icon={<FiEdit />} onClick={() => { }}> Editar</MenuItem>
                                                        </PermissionsGate>
                                                        <PermissionsGate permissions={[]}>
                                                            <MenuItem color="red.500" icon={<FaTrash />} onClick={() => { }}> Excluir</MenuItem>
                                                        </PermissionsGate>
                                                    </MenuList>
                                                </Menu>
                                                {/* <Button colorScheme='messenger' size="lg" variant='solid'>
                                                    Selecionar
                                                </Button> */}
                                            </PayPlanCard>
                                        )
                                    })
                                    :
                                    <div className="no-payplans">
                                        <AiOutlineInfoCircle size="1.2rem" />
                                        Nenhum plano de pagamento cadastrado até o momento.
                                    </div>
                            }
                        </PayplansFlex>
                    </>
                }
            </div>
        </Container>
    );
}

export { EventPayplans };