import { useEffect } from 'react';
import { CategoriesFlex, CategoryItem, Container } from './styles';
import { Alert, AlertIcon, Button, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { ICategory } from '../../../../context/stores/events';
import { BsCheck2Circle, BsPlusCircleDotted } from 'react-icons/bs';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { AiFillSetting, AiOutlineInfoCircle } from 'react-icons/ai';
import PermissionsGate from '../../../../helpers/PermissionsGate';
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { useModalControl } from '../../../../hooks/useModalControl';
import { CreateCategoryModal } from '../../../../components/CreateCategoryModal';

type IRequestGetEventCategoriesReturn = {
    categories: ICategory[];
};

type IRequestUpdateCategoriesOrderReturn = {
    message: string;
};

const EventCategories = () => {
    const { events, eventsDispatch } = useAppContext();
    const [showCreateCategoryModal, categoryToEdit, turnCreateCategoryModal] = useModalControl<ICategory>();

    const {
        isLoading: isLoadingEventCategories,
        handleRequest: getEventCategories
    } = useApiRequest<IRequestGetEventCategoriesReturn>({
        defaultConfig: {
            url: `/categories/${events.selected.event?.id}/list`,
        },
        handleOnFirstRender: false,
        onSuccess(data) {
            orderCategories(data.categories);
        },
    })

    const {
        isLoading: isLoadingUpdateCategoriesOrder,
        handleRequest: updateCategoriesOrder
    } = useApiRequest<IRequestUpdateCategoriesOrderReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: "Ordem salva com sucesso!"
    })

    useEffect(() => {
        const controller = new AbortController();
        getEventCategories({
            url: `/categories/${events.selected.event?.id}/list`,
            signal: controller.signal
        })

        return () => {
            controller.abort()
        }
    }, [])

    function alterOrder(itemIdx: number, increse: boolean) {
        let items = events.categories;

        if (increse === true) {
            const nextItem = items[itemIdx - 1];
            if (nextItem) {
                const inMovingItem = items[itemIdx];
                items[itemIdx] = nextItem;
                items[itemIdx - 1] = inMovingItem;
            }
        } else {
            const previousItem = items[itemIdx + 1];
            if (previousItem) {
                const inMovingItem = items[itemIdx];
                items[itemIdx] = previousItem;
                items[itemIdx + 1] = inMovingItem;
            }
        }

        orderCategories(items.map((item, idx) => {
            item.order = idx;

            return item
        }));
    }

    function orderCategories(categories: ICategory[]) {
        categories = categories

        const orderFunction = (itemA: ICategory, itemB: ICategory) => {
            if (itemA.order > itemB.order) return 1
            if (itemA.order < itemB.order) return -1
            return 0
        }
        eventsDispatch({ type: "events/set-categories", payload: categories.sort(orderFunction) });
    }

    async function saveCategoriesOrder() {
        const data = {
            event_id: events.selected.event?.id,
            categories: events.categories.map(item => {
                return {
                    id: item.id,
                    order: item.order
                }
            })
        }

        updateCategoriesOrder({
            method: 'put',
            url: `/categories/update-order`,
            data
        })
    }

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    Nesta seção você poderá cadastrar Categorias para o evento e modificar a ordem de listagem para as pessoas.
                </Alert>
            </div>
            <div className="event-categories">
                {isLoadingEventCategories ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /> :
                    <>
                        <CategoriesFlex>
                            {
                                events.categories.length > 0 ?
                                    events.categories.map((item, idx) => {
                                        return (
                                            <CategoryItem key={idx}>
                                                <div className="content">
                                                    <div className="order">
                                                        <TiArrowSortedUp size="1.5rem" onClick={(event) => {
                                                            event.stopPropagation()
                                                            alterOrder(idx, true)
                                                        }} />
                                                        <TiArrowSortedDown size="1.5rem" onClick={(event) => {
                                                            event.stopPropagation()
                                                            alterOrder(idx, false)
                                                        }} />
                                                    </div>
                                                    <div className="content-data">
                                                        <div className="name">
                                                            <div className="label">
                                                                <span>Nome</span>
                                                                <p>{item.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="age">
                                                            <div className="label">
                                                                <span>Idade</span>
                                                                <p>De {item.start_age} até {item.end_age} anos</p>
                                                            </div>
                                                        </div>
                                                        <div className="type">
                                                            <div className="label">
                                                                <span>Tipo</span>
                                                                <p>{item.category_type}</p>
                                                            </div>
                                                        </div>
                                                        <div className="gender">
                                                            <div className="label">
                                                                <span>Sexo</span>
                                                                <p>{item.gender_type}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="config">
                                                        <Menu>
                                                            <MenuButton as={Button}>
                                                                <AiFillSetting />
                                                            </MenuButton>
                                                            <MenuList>
                                                                <PermissionsGate permissions={[]}>
                                                                    <MenuItem icon={<FiEdit />} onClick={() => turnCreateCategoryModal(item)}> Editar</MenuItem>
                                                                </PermissionsGate>
                                                                <PermissionsGate permissions={[]}>
                                                                    <MenuItem color="red.500" icon={<FaTrash />} > Excluir</MenuItem>
                                                                </PermissionsGate>
                                                            </MenuList>
                                                        </Menu>
                                                    </div>
                                                </div>
                                            </CategoryItem>
                                        )
                                    })
                                    :
                                    <div className="no-categories">
                                        <AiOutlineInfoCircle size="1.2rem" />
                                        Nenhuma categoria cadastrada até o momento.
                                    </div>
                            }
                        </CategoriesFlex>
                        <div className="actions">
                            <Button
                                type="button"
                                rightIcon={<BsCheck2Circle size="1.2rem" />}
                                colorScheme="messenger"
                                variant='outline'
                                isLoading={isLoadingUpdateCategoriesOrder}
                                onClick={saveCategoriesOrder}
                            >
                                Salvar Ordem
                            </Button>
                            <Button
                                onClick={() => turnCreateCategoryModal()}
                                type="button"
                                rightIcon={<BsPlusCircleDotted size="1.2rem" />}
                                colorScheme="teal"
                            >
                                Nova Categoria
                            </Button>
                        </div>
                    </>
                }
            </div>

            <CreateCategoryModal
                isOpen={showCreateCategoryModal}
                turnModal={({ reload, data }) => {
                    turnCreateCategoryModal(data);
                    if (reload === true) getEventCategories();
                }}
                category={categoryToEdit}
                eventId={events.selected.event?.id}
            />
        </Container>
    );
}

export { EventCategories };