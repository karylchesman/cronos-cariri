import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { BsPlusCircleDotted, BsSearch, BsUnlockFill } from 'react-icons/bs';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { AiFillSetting } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { Pagination } from '../../components/Pagination';
import { SpanOrderIcon } from '../../components/SpanOrderIcon';
import { FaTrash, FaUserEdit } from 'react-icons/fa';
import { useDataPagination } from '../../hooks/useDataPagination';
import dayjs from 'dayjs';
import { EventStatusBadge } from '../../components/EventStatusBadge';
import { MdDashboard } from 'react-icons/md';
import { GiCancel } from 'react-icons/gi';

export enum EEventTypes {
    "MTB" = "MTB",
    "Trail" = "Trail",
    "Corrida de Rua" = "Corrida de Rua"
}

export enum EEventStatus {
    "Publicado" = "Publicado",
    "Não Publicado" = "Não Publicado",
    "Cancelado" = "Cancelado",
}

export enum EEventResultTypes {
    "Importação" = "Importação",
    "Integração" = "Integração",
    "PDF" = "PDF",
}

export interface Event {
    id: string;
    name: string;
    event_date: Date;
    event_time: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
    email: string;
    phonenumber?: string;
    event_type: EEventTypes;
    inscription_limit_date: Date;
    url_path: string;
    status: EEventStatus;
    banner_archive?: string;
    banner_description?: string;
    result_type?: EEventResultTypes;
    created_at: Date;
    updated_at: Date;
}

interface IGetEventsReturnType {
    events: Event[];
    registers: number;
}

const Events = () => {

    const pageNavigator = useNavigate();
    const theme = useTheme();
    const toast = useToast();
    const {
        data,
        changeOrder,
        // handleRequestData: loadEvents,
        isLoading,
        searchByTerm,
        searchPagination,
        setSearchPagination,
        setSearchTerm
    } = useDataPagination<IGetEventsReturnType, Event>({
        initalState: null,
        initalOrderBy: "name",
        endPointPath: "/events/search"
    });

    return (
        <MainContainer>
            <Container>
                <div id="header">
                    <div className="title">
                        <BiLeftArrowAlt onClick={() => pageNavigator("/admin/home")} className="button-return" size="2.3rem" />
                        <h1>Eventos</h1>
                    </div>
                    <div className="button-create-user">
                        <Button /* onClick={() => turnCreateUserModal()} */ rightIcon={<BsPlusCircleDotted />} colorScheme='teal'>Novo</Button>
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
                                            <SpanOrderIcon fieldDisplayName="Data" fieldName="event_date" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th>
                                            <SpanOrderIcon fieldDisplayName="Status" fieldName="status" orderByCurrent={searchPagination} setOrderFunction={changeOrder} />
                                        </Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        (data !== null && data.events.length > 0 && isLoading === false) ?
                                            data.events.map((item, idx) => {
                                                return (
                                                    <Tr key={idx} _hover={{ background: theme.colors.main + "20" }}>
                                                        <Td>{idx + 1}</Td>
                                                        <Td>{item.name}</Td>
                                                        <Td>{dayjs(item.event_date).format("DD/MM/YYYY")}</Td>
                                                        <Td>
                                                            <EventStatusBadge status={item.status} />
                                                        </Td>
                                                        <Td>
                                                            <Menu>
                                                                <MenuButton as={Button}>
                                                                    <AiFillSetting />
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem icon={<MdDashboard />}> Dashboard</MenuItem>
                                                                    {
                                                                        item.status !== EEventStatus["Publicado"] &&
                                                                        <MenuItem color="green.500" icon={<BsUnlockFill />}> Publicar</MenuItem>
                                                                    }
                                                                    <MenuItem color="red.500" icon={<GiCancel />}> Cancelar</MenuItem>
                                                                    <MenuItem color="red.500" icon={<FaTrash />}> Excluir</MenuItem>
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
                                        <Th textAlign="end">{searchPagination.registers} Evento(s)</Th>
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

                {/* <CreateUserModal
                    isOpen={showCreateUserModal}
                    turnModal={({ data, reload }) => {
                        turnCreateUserModal(data);
                        if (reload === true) loadUsers();
                    }}
                    user={userToEdit}
                /> */}
            </Container>
        </MainContainer>
    );
}

export { Events };