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
import PermissionsGate from '../../helpers/PermissionsGate';
import { useModalControl } from '../../hooks/useModalControl';
import { IPermission, IRole } from '../../@types/users';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import { SearchWithFilter } from '../../components/SearchWithFilter';
import { CreatePermissionModal } from '../../components/CreatePermissionModal';

interface IGetPermissionsReturnType {
    permissions: IPermission[];
    registers: number;
}

const Permissions = () => {

    const pageNavigator = useNavigate();
    const theme = useTheme();
    const toast = useToast();
    const {
        data,
        changeOrder,
        handleRequestData: loadPermissions,
        isLoading,
        searchPagination,
        setSearchPagination,
        addOrRemoveFilter,
        changeSearch,
    } = useDataPagination<IGetPermissionsReturnType, IRole>({
        initalState: null,
        initalOrderBy: "name",
        endPointPath: "/permissions/search"
    });

    const [showCreatePermissionModal, permissionToEdit, turnCreatePermissionModal] = useModalControl<IPermission>();

    async function deletePermission(permission_id: string) {

        Swal.fire({
            icon: 'warning',
            title: 'Excluir permissão',
            text: "Tem certeza que deseja excluir esta permissão?\nTodos os usuários atualmente vinculados a esta permissão perderão acesso ao componente dependente a ela.",
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
                await api.delete(`/permissions/${permission_id}`);

                toast({
                    title: "Feito!",
                    description: "Permissão excluída com sucesso!",
                    status: "success",
                    duration: 3000,
                    variant: "left-accent",
                    position: "top"
                });
                loadPermissions();
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
                    preConfirm: () => deletePermission(permission_id)
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
                        <h1>Permissões</h1>
                    </div>
                    <div className="button-create-user">
                        <PermissionsGate permissions={["PERMISSION_CREATE"]}>
                            <Button onClick={() => turnCreatePermissionModal()} rightIcon={<BsPlusCircleDotted />} colorScheme='teal'>Novo</Button>
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
                                loadPermissions()
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
                                        alias: "Identificador",
                                        key: "identifier"
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
                                        <Th display="flex" justifyContent="center">Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        (data !== null && data.permissions.length > 0 && isLoading === false) ?
                                            data.permissions.map((item, idx) => {
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
                                                                    <PermissionsGate permissions={["PERMISSION_UPDATE"]}>
                                                                        <MenuItem onClick={() => turnCreatePermissionModal(item)} icon={<FiEdit />}> Editar</MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["PERMISSION_DELETE"]}>
                                                                        <MenuItem onClick={() => deletePermission(item.id)} color="red.500" icon={<FaTrash />}> Excluir</MenuItem>
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
                                                                Nenhuma permissão encontrada.
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
                                        <Th textAlign="end">{searchPagination.registers} Permissão(ões)</Th>
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

                <CreatePermissionModal
                    isOpen={showCreatePermissionModal}
                    turnModal={({ data, reload }) => {
                        turnCreatePermissionModal(data);
                        if (reload === true) loadPermissions();
                    }}
                    permission={permissionToEdit}
                />
            </Container>
        </MainContainer>
    );
}

export { Permissions };