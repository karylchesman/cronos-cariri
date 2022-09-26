import React, { useEffect, useState } from 'react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useTheme } from 'styled-components';
import { IUser } from '../../@types/users';
import { api } from '../../services/ApiService';
import { SearchObject } from '../../utils/search-object';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

interface ISearchState {
    limit: number;
    page: number;
    search_params?: SearchObject<IUser> | string;
    registers: number;
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
        registers: 0
    })

    async function loadUsers(signal?: AbortSignal) {
        setIsloading(true)
        console.log("called")
        try {
            const result = await api.post(`/users/search?limit=${searchPagination.limit}&page=${searchPagination.page}`, {
                search_params: searchPagination.search_params
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

    useEffect(() => {
        const controller = new AbortController();
        loadUsers(controller.signal);

        return () => {
            controller.abort();
        }
    }, [searchPagination.search_params])

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
                                        <Th>Nome</Th>
                                        <Th>E-mail</Th>
                                        <Th>Permissão</Th>
                                        <Th>Dados P.</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        users.length > 0 ?
                                            users.map((item, idx) => {
                                                return (
                                                    <Tr key={idx} _hover={{ background: theme.colors.main + "20" }}>
                                                        <Td>{idx}</Td>
                                                        <Td>{item.name}</Td>
                                                        <Td>{item.email}</Td>
                                                        <Td>{item.role}</Td>
                                                        <Td>{item.person_id ? "SIM" : "NÃO"}</Td>
                                                    </Tr>
                                                )
                                            })
                                            :
                                            <Tr>
                                                <Th textAlign="end" colSpan={5}>
                                                    <Alert status='info'>
                                                        <AlertIcon />
                                                        Nenhum usuário encontrado.
                                                    </Alert>
                                                </Th>
                                            </Tr>

                                    }
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th textAlign="end" colSpan={5}>{searchPagination.registers} Usuário(s)</Th>
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