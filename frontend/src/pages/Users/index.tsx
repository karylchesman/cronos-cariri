import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Badge, Button, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BsSearch } from 'react-icons/bs';
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

    async function loadUsers(signal?: AbortSignal) {
        setIsloading(true)
        console.log("looping...")
        try {
            const result = await api.post(`/users/search?limit=${searchPagination.limit}&page=${searchPagination.page}`, {
                search_params: searchPagination.search_params,
                order_by: searchPagination.order_by,
                order: searchPagination.order
            }, { signal });

            setUsers(result.data.users);
            setSearchPagination((state) => ({ ...state, registers: result.data.registers }))
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
                    <BiLeftArrowAlt onClick={() => pageNavigator("/admin/home")} className="button-return" size="2.3rem" /><h1>Usuários</h1>
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
                                        <Th>
                                            <SpanOrderIcon fieldDisplayName="Permissão" fieldName="role" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
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
                                                            <Badge colorScheme="blue">{item.role}</Badge>
                                                        </Td>
                                                        <Td>
                                                            <Menu>
                                                                <MenuButton as={Button}>
                                                                    <AiFillSetting />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem icon={<RiUserSettingsFill />}> Dados pessoais</MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })
                                            :
                                            <Tr>
                                                <Th textAlign="center" colSpan={5}>
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
                                        <Th colSpan={4}>
                                            <Select maxWidth={200} variant='unstyled' onChange={(e) => {
                                                setSearchPagination((state) => {
                                                    let value = Number(e.target.value);
                                                    if (Number.isNaN(value)) return state;

                                                    return {
                                                        ...state,
                                                        limit: value
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
                                    <Tr>
                                        <Th textAlign="center" colSpan={5}>
                                            <Pagination
                                                actualPage={searchPagination.page}
                                                registers={searchPagination.registers}
                                                reloadFunction={loadUsers}
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
                                        </Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Container>
        </MainContainer>
    );
}

export { Users };