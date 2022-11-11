import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Button, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { RiUserSettingsFill } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { IUser } from '../../@types/users';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { Pagination } from '../../components/Pagination';
import { SpanOrderIcon } from '../../components/SpanOrderIcon';
import { useModalControl } from '../../hooks/useModalControl';
import { FaShieldAlt, FaTrash, FaUserEdit } from 'react-icons/fa';
import { CreateUserModal } from '../../components/CreateUserModal';
import PermissionsGate from '../../helpers/PermissionsGate';
import { AttachRoleToUserModal } from '../../components/AttachRoleToUserModal';
import { SearchWithFilter } from '../../components/SearchWithFilter';
import { useDataPagination } from '../../hooks/useDataPagination';
import { UpdatePersonModal } from '../../components/UpdatePersonModal';
import { IPerson } from '../../@types/persons';

interface IGetUsersReturnType {
    users: IUser[];
    registers: number;
}

const Users = () => {

    const pageNavigator = useNavigate();
    const theme = useTheme();
    const toast = useToast();

    const [showCreateUserModal, userToEdit, turnCreateUserModal] = useModalControl<IUser>();
    const [showUpdatePersonModal, personToEdit, turnUpdatePersonModal] = useModalControl<IPerson>();
    const [showAttachRoleToUserModal, userIdToAttach, turnAttachRoleToUserModal] = useModalControl<string>();

    const {
        data: usersData,
        changeOrder,
        handleRequestData: loadUsers,
        isLoading,
        searchPagination,
        setSearchPagination,
        addOrRemoveFilter,
        changeSearch,
    } = useDataPagination<IGetUsersReturnType, IUser>({
        initalState: null,
        initalOrderBy: "name",
        endPointPath: "/users/search"
    });

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

    return (
        <MainContainer>
            <Container>
                <div id="header">
                    <div className="title">
                        <BiLeftArrowAlt onClick={() => pageNavigator("/admin/home")} className="button-return" size="2.3rem" />
                        <h1>Usuários</h1>
                    </div>
                    <div className="button-create-user">
                        <PermissionsGate permissions={["USER_CREATE"]}>
                            <Button onClick={() => turnCreateUserModal()} rightIcon={<BsPlusCircleDotted />} colorScheme='teal'>Novo</Button>
                        </PermissionsGate>
                    </div>
                </div>
                <div id="body">
                    <div className="search-box">
                        <SearchWithFilter
                            onChangeFilter={(data) => {
                                if (typeof data === "string") {
                                    changeSearch(data)
                                } else {
                                    addOrRemoveFilter(data)
                                }
                            }}
                            onEnterPress={() => {
                                loadUsers()
                            }}
                            onSearchTypeChange={(type) => {
                                if (type === "filter") {
                                    changeSearch([])
                                } else {
                                    changeSearch("")
                                }
                            }}
                            searchValue={searchPagination.search_params === undefined ? "" : searchPagination.search_params}
                            filterOptions={
                                [
                                    {
                                        alias: "Nome",
                                        key: "name"
                                    },
                                    {
                                        alias: "E-mail",
                                        key: "email"
                                    },
                                    {
                                        alias: "CPF",
                                        key: "person:cpf"
                                    },
                                    {
                                        alias: "Contato 1",
                                        key: "person:phonenumber1"
                                    },
                                    {
                                        alias: "Contato 2",
                                        key: "person:phonenumber2"
                                    },
                                    {
                                        alias: "Sexo",
                                        key: "person:gender"
                                    },
                                    {
                                        alias: "RG",
                                        key: "person:rg"
                                    },
                                    {
                                        alias: "Data de nascimento",
                                        key: "person:bith_date"
                                    },
                                    {
                                        alias: "Tipo sanguineo",
                                        key: "person:blood_type"
                                    },
                                    {
                                        alias: "Endereço - Rua",
                                        key: "person:address_street"
                                    },
                                    {
                                        alias: "Endereço - número",
                                        key: "person:address_number"
                                    },
                                    {
                                        alias: "Endereço - Bairro",
                                        key: "person:address_district"
                                    },
                                    {
                                        alias: "Endereço - Cidade",
                                        key: "person:address_city"
                                    },
                                    {
                                        alias: "Endereço - UF",
                                        key: "person:address_uf"
                                    },
                                    {
                                        alias: "Endereço - CEP",
                                        key: "person:address_cep"
                                    }
                                ]
                            }
                        />
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
                                            <SpanOrderIcon fieldDisplayName="CPF" fieldName="person:cpf" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th display="flex" justifyContent="center">Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        (usersData !== null && usersData.users.length > 0 && isLoading === false) ?
                                            usersData.users.map((item, idx) => {
                                                return (
                                                    <Tr key={idx} _hover={{ background: theme.colors.main + "20" }}>
                                                        <Td>{idx + 1}</Td>
                                                        <Td>{item.name}</Td>
                                                        <Td>{item.email}</Td>
                                                        <Td>{item.person ? item.person.cpf : "Não informado."}</Td>
                                                        <Td display="flex" justifyContent="center">
                                                            <Menu>
                                                                <MenuButton as={Button}>
                                                                    <AiFillSetting />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <PermissionsGate permissions={["USER_UPDATE"]}>
                                                                        <MenuItem onClick={() => turnUpdatePersonModal(item.person)} icon={<RiUserSettingsFill />}>
                                                                            Editar dados pessoais
                                                                        </MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["USER_UPDATE"]}>
                                                                        <MenuItem onClick={() => turnCreateUserModal(item)} icon={<FaUserEdit />}>
                                                                            Editar usuário
                                                                        </MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["ROLE_ATTACH"]}>
                                                                        <MenuItem onClick={() => turnAttachRoleToUserModal(item.id)} icon={<FaShieldAlt />}>
                                                                            Perfis de acesso
                                                                        </MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["USER_DELETE"]}>
                                                                        <MenuItem onClick={() => deleteUser(item.id || "")} color="red.500" icon={<FaTrash />}>
                                                                            Excluir
                                                                        </MenuItem>
                                                                    </PermissionsGate>
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

                <UpdatePersonModal
                    isOpen={showUpdatePersonModal}
                    turnModal={({ data, reload }) => {
                        turnUpdatePersonModal(data);
                        if (reload === true) loadUsers();
                    }}
                    person={personToEdit}
                />

                <AttachRoleToUserModal
                    isOpen={showAttachRoleToUserModal}
                    turnModal={({ data }) => {
                        turnAttachRoleToUserModal(data);
                    }}
                    userId={userIdToAttach}
                />
            </Container>
        </MainContainer>
    );
}

export { Users };