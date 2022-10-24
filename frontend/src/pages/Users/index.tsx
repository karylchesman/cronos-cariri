import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Badge, Button, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BsPlusCircleDotted, BsSearch } from 'react-icons/bs';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { IUser } from '../../@types/users';
import { api } from '../../services/ApiService';
import { SearchObject } from '../../utils/search-object';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { Pagination } from '../../components/Pagination';
import { SpanOrderIcon } from '../../components/SpanOrderIcon';
import { useModalControl } from '../../hooks/useModalControl';
import { FaTrash, FaUserEdit } from 'react-icons/fa';
import { CreateUserModal } from '../../components/CreateUserModal.ts';

interface ISearchState {
    limit: number;
    page: number;
    search_params?: SearchObject<IUser> | string;
    registers: number;
    order_by: string;
    order: "ASC" | "DESC";
}

const Users = () => {

    const pageNavigator = useNavigate();
    const theme = useTheme();
    const toast = useToast();
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsloading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string | undefined>("");
    const [searchPagination, setSearchPagination] = useState<ISearchState>({
        limit: 10,
        page: 1,
        search_params: undefined,
        registers: 0,
        order_by: "name",
        order: "ASC"
    })

    const [showCreateUserModal, userToEdit, turnCreateUserModal] = useModalControl<IUser>();

    async function loadUsers(signal?: AbortSignal) {
        setIsloading(true)
        try {
            const result = await api.post(`/users/search?limit=${searchPagination.limit}&page=${searchPagination.page}`, {
                search_params: searchPagination.search_params,
                order_by: searchPagination.order_by,
                order: searchPagination.order
            }, { signal });

            setUsers(result.data.users);
            setSearchPagination((state) => ({
                ...state,
                registers: result.data.registers,
                page: result.data.registers !== searchPagination.registers ? 1 : searchPagination.page
            }))
        } catch (err: AxiosError | any) {
            if (err.name === "CanceledError") return;

            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: err.response ? err.response.data.error : "Falha ao tentar comunicar-se com o servidor.",
                toast: true,
                confirmButtonColor: theme.button_colors.primary,
                confirmButtonText: "Tentar novamente",
                showDenyButton: true,
                denyButtonText: "Cancelar",
                denyButtonColor: theme.button_colors.danger,
                preConfirm: () => loadUsers()
            })
        }
        setIsloading(false)
    }

    async function deleteUser(user_id: string) {

        Swal.fire({
            icon: 'warning',
            title: 'Excluir usuário',
            text: "Tem certeza que deseja excluir este usuário?",
            toast: true,
            confirmButtonColor: theme.button_colors.primary,
            confirmButtonText: "Confirmar",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: theme.button_colors.danger,
            preConfirm: () => execute(),
            showLoaderOnConfirm: true
        })

        const execute = async () => {
            try {
                await api.delete(`/users/${user_id}`);

                toast({
                    title: "Feito!",
                    description: "Usuário excluído com sucesso!",
                    status: "success",
                    duration: 3000,
                    variant: "left-accent",
                    position: "top"
                });
                loadUsers();
            } catch (err: AxiosError | any) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: err.response ? err.response.data.error : "Falha ao tentar comunicar-se com o servidor.",
                    toast: true,
                    confirmButtonColor: theme.button_colors.primary,
                    confirmButtonText: "Tentar novamente",
                    showDenyButton: true,
                    denyButtonText: "Cancelar",
                    denyButtonColor: theme.button_colors.danger,
                    preConfirm: () => deleteUser(user_id)
                })
            }
        }
    }

    function searchByTerm() {
        setSearchPagination((state) => ({ ...state, search_params: searchTerm }))
    }

    function changeOrder(order_by: string) {
        setSearchPagination((state) => ({ ...state, order_by, order: state.order === "ASC" ? "DESC" : "ASC" }))
    }

    useEffect(() => {
        const controller = new AbortController();
        loadUsers(controller.signal);

        return () => {
            controller.abort();
        }
    }, [
        searchPagination.search_params,
        searchPagination.limit,
        searchPagination.page,
        searchPagination.order_by,
        searchPagination.order
    ])

    return (
        <MainContainer>
            <Container>
                <div id="header">
                    <div className="title">
                        <BiLeftArrowAlt onClick={() => pageNavigator("/admin/home")} className="button-return" size="2.3rem" />
                        <h1>Usuários</h1>
                    </div>
                    <div className="button-create-user">
                        <Button onClick={() => turnCreateUserModal()} rightIcon={<BsPlusCircleDotted />} colorScheme='teal'>Novo</Button>
                    </div>
                </div>
                <div id="body">
                    <div className="search-box">
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type="text"
                                placeholder='Digite algo para procurar...'
                                onChange={(event) => {
                                    let value = event.target.value;

                                    if (value === "") {
                                        setSearchTerm(undefined);
                                    } else {
                                        setSearchTerm(value);
                                    }
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        searchByTerm()
                                    }
                                }}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' colorScheme="messenger" onClick={searchByTerm}>
                                    <BsSearch color="#FFF" />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </div>

                    <div className="table-box">
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>
                                            <SpanOrderIcon fieldDisplayName="Nome" fieldName="name" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th>
                                            <SpanOrderIcon fieldDisplayName="E-mail" fieldName="email" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        (users.length > 0 && isLoading === false) ?
                                            users.map((item, idx) => {
                                                return (
                                                    <Tr key={idx} _hover={{ background: theme.colors.main + "20" }}>
                                                        <Td>{idx + 1}</Td>
                                                        <Td>{item.name}</Td>
                                                        <Td>{item.email}</Td>
                                                        <Td>
                                                            <Menu>
                                                                <MenuButton as={Button}>
                                                                    <AiFillSetting />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem icon={<RiUserSettingsFill />}> Dados pessoais</MenuItem>
                                                                    <MenuItem onClick={() => turnCreateUserModal(item)} icon={<FaUserEdit />}> Editar</MenuItem>
                                                                    <MenuItem onClick={() => deleteUser(item.id || "")} color="red.500" icon={<FaTrash />}> Excluir</MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })
                                            :
                                            <Tr>
                                                <Th textAlign="center" colSpan={4}>
                                                    {
                                                        isLoading ?
                                                            <Spinner
                                                                thickness='4px'
                                                                speed='0.65s'
                                                                emptyColor='gray.200'
                                                                color='blue.500'
                                                                size='xl'
                                                            />
                                                            :
                                                            <Alert status='info'>
                                                                <AlertIcon />
                                                                Nenhum usuário encontrado.
                                                            </Alert>
                                                    }
                                                </Th>
                                            </Tr>
                                    }
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th colSpan={3}>
                                            <Select maxWidth={200} variant='unstyled' onChange={(e) => {
                                                setSearchPagination((state) => {
                                                    let value = Number(e.target.value);
                                                    if (Number.isNaN(value)) return state;

                                                    return {
                                                        ...state,
                                                        limit: value,
                                                        page: 1
                                                    }
                                                })
                                            }}>
                                                <option value='10'>10 por página</option>
                                                <option value='20'>20 por página</option>
                                                <option value='50'>50 por página</option>
                                            </Select>
                                        </Th>
                                        <Th textAlign="end">{searchPagination.registers} Usuário(s)</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>

                        </TableContainer>
                        <Pagination
                            actualPage={searchPagination.page}
                            registers={searchPagination.registers}
                            registersPerPage={searchPagination.limit}
                            setPage={(page: number) => {
                                setSearchPagination((state) => {
                                    return {
                                        ...state,
                                        page
                                    }
                                })
                            }}
                        />
                    </div>
                </div>

                <CreateUserModal
                    isOpen={showCreateUserModal}
                    turnModal={({ data, reload }) => {
                        turnCreateUserModal(data);
                        if (reload === true) loadUsers();
                    }}
                    user={userToEdit}
                />
            </Container>
        </MainContainer>
    );
}

export { Users };