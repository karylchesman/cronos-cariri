import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Button, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { Pagination } from '../../components/Pagination';
import { SpanOrderIcon } from '../../components/SpanOrderIcon';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useDataPagination } from '../../hooks/useDataPagination';
import { MdOutlineChecklist } from 'react-icons/md';
import PermissionsGate from '../../helpers/PermissionsGate';
import { CreateRoleModal } from '../../components/CreateRoleModal';
import { useModalControl } from '../../hooks/useModalControl';
import { IRole } from '../../@types/users';
import { AttachPermissionToRoleModal } from '../../components/AttachPermissionToRoleModal';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import { SearchWithFilter } from '../../components/SearchWithFilter';

interface IGetRolesReturnType {
    roles: IRole[];
    registers: number;
}

const Roles = () => {

    const pageNavigator = useNavigate();
    const theme = useTheme();
    const toast = useToast();
    const {
        data,
        changeOrder,
        handleRequestData: loadRoles,
        isLoading,
        searchPagination,
        setSearchPagination,
        addOrRemoveFilter,
        changeSearch,
    } = useDataPagination<IGetRolesReturnType, IRole>({
        initalState: null,
        initalOrderBy: "name",
        endPointPath: "/roles/search"
    });

    const [showCreateRoleModal, roleToEdit, turnCreateRoleModal] = useModalControl<IRole>();
    const [showAttachPermissionToRoleModal, roleIdToAttach, turnAttachPermissionToRoleModal] = useModalControl<string>();

    async function deleteRole(role_id: string) {

        Swal.fire({
            icon: 'warning',
            title: 'Excluir perfil de acesso',
            text: "Tem certeza que deseja excluir este perfil de acesso?\nTodos os usu??rios atualmente vinculados a este perfil perder??o todas as permiss??es exclusivas a ele.",
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
                await api.delete(`/roles/${role_id}`);

                toast({
                    title: "Feito!",
                    description: "Perfil exclu??do com sucesso!",
                    status: "success",
                    duration: 3000,
                    variant: "left-accent",
                    position: "top"
                });
                loadRoles();
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
                    preConfirm: () => deleteRole(role_id)
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
                        <h1>Perfis de Acesso</h1>
                    </div>
                    <div className="button-create-user">
                        <PermissionsGate permissions={["ROLE_CREATE"]}>
                            <Button onClick={() => turnCreateRoleModal()} rightIcon={<BsPlusCircleDotted />} colorScheme='teal'>Novo</Button>
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
                                loadRoles()
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
                                            <SpanOrderIcon fieldDisplayName="Criado em" fieldName="created_at" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th display="flex" justifyContent="center">A????es</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        (data !== null && data.roles.length > 0 && isLoading === false) ?
                                            data.roles.map((item, idx) => {
                                                return (
                                                    <Tr key={idx} _hover={{ background: theme.colors.main + "20" }}>
                                                        <Td>{idx + 1}</Td>
                                                        <Td>{item.name}</Td>
                                                        <Td>{dayjs(item.created_at).format("DD/MM/YYYY")}</Td>
                                                        <Td display="flex" justifyContent="center">
                                                            <Menu>
                                                                <MenuButton as={Button}>
                                                                    <AiFillSetting />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <PermissionsGate permissions={["PERMISSION_ATTACH"]}>
                                                                        <MenuItem onClick={() => turnAttachPermissionToRoleModal(item.id)} icon={<MdOutlineChecklist />}> Permiss??es</MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["ROLE_UPDATE"]}>
                                                                        <MenuItem onClick={() => turnCreateRoleModal(item)} icon={<FiEdit />}> Editar</MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["ROLE_DELETE"]}>
                                                                        <MenuItem onClick={() => deleteRole(item.id)} color="red.500" icon={<FaTrash />}> Excluir</MenuItem>
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
                                                                Nenhum perfil encontrado.
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
                                                <option value='10'>10 por p??gina</option>
                                                <option value='20'>20 por p??gina</option>
                                                <option value='50'>50 por p??gina</option>
                                            </Select>
                                        </Th>
                                        <Th textAlign="end">{searchPagination.registers} Perfil(s)</Th>
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

                <CreateRoleModal
                    isOpen={showCreateRoleModal}
                    turnModal={({ data, reload }) => {
                        turnCreateRoleModal(data);
                        if (reload === true) loadRoles();
                    }}
                    role={roleToEdit}
                />

                <AttachPermissionToRoleModal
                    isOpen={showAttachPermissionToRoleModal}
                    turnModal={({ data }) => {
                        turnAttachPermissionToRoleModal(data);
                    }}
                    roleId={roleIdToAttach}
                />
            </Container>
        </MainContainer>
    );
}

export { Roles };