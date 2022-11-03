import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BsPlusCircleDotted, BsSearch } from 'react-icons/bs';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { Pagination } from '../../components/Pagination';
import { SpanOrderIcon } from '../../components/SpanOrderIcon';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useDataPagination } from '../../hooks/useDataPagination';
import dayjs from 'dayjs';
import { MdOutlineChecklist } from 'react-icons/md';
import PermissionsGate from '../../helpers/PermissionsGate';
import { CreateRoleModal } from '../../components/CreateRoleModal';
import { useModalControl } from '../../hooks/useModalControl';
import { IRole } from '../../@types/users';
import { AttachPermissionToRoleModal } from '../../components/AttachPermissionToRoleModal';

export interface Role {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface IGetRolesReturnType {
    roles: Role[];
    registers: number;
}

const Roles = () => {

    const pageNavigator = useNavigate();
    const theme = useTheme();
    const {
        data,
        changeOrder,
        handleRequestData: loadRoles,
        isLoading,
        searchByTerm,
        searchPagination,
        setSearchPagination,
        setSearchTerm
    } = useDataPagination<IGetRolesReturnType, Role>({
        initalState: null,
        initalOrderBy: "name",
        endPointPath: "/roles/search"
    });

    const [showCreateRoleModal, roleToEdit, turnCreateRoleModal] = useModalControl<IRole>();
    const [showAttachPermissionToRoleModal, roleIdToAttach, turnAttachPermissionToRoleModal] = useModalControl<string>();

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
                                            <SpanOrderIcon fieldDisplayName="Criado em" fieldName="created_at" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th>Ações</Th>
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
                                                        <Td>
                                                            <Menu>
                                                                <MenuButton as={Button}>
                                                                    <AiFillSetting />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <PermissionsGate permissions={["PERMISSION_ATTACH"]}>
                                                                        <MenuItem onClick={() => turnAttachPermissionToRoleModal(item.id)} icon={<MdOutlineChecklist />}> Permissões</MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["ROLE_UPDATE"]}>
                                                                        <MenuItem onClick={() => turnCreateRoleModal(item)} icon={<FiEdit />}> Editar</MenuItem>
                                                                    </PermissionsGate>
                                                                    <PermissionsGate permissions={["ROLE_DELETE"]}>
                                                                        <MenuItem color="red.500" icon={<FaTrash />}> Excluir</MenuItem>
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
                                                <option value='10'>10 por página</option>
                                                <option value='20'>20 por página</option>
                                                <option value='50'>50 por página</option>
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