import { useState, useEffect } from 'react';
import { Container } from './styles';
import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Spinner,
    Switch
} from '@chakra-ui/react';
import { BsCheck2Circle } from 'react-icons/bs';
import { useApiRequest } from '../../hooks/useApiRequest';
import { IPermission, IRole } from '../../@types/users';

interface IAttachRoleToUserModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    userId: string | null;
}

interface IRequestUserRolesReturn {
    roles: IRole[];
    permissions: IPermission[];
}

interface IRequestRolesReturn {
    roles: IRole[];
    registers: number;
}

const AttachRoleToUserModal = ({ isOpen, turnModal, userId }: IAttachRoleToUserModalProps) => {

    const [rolesToAttach, setRolesToAttach] = useState<string[]>([]);

    const {
        data: userRolesData,
        isLoading: isLoadingUserRoles,
        handleRequest: loadUserRoles
    } = useApiRequest<IRequestUserRolesReturn>({
        defaultConfig: {
            method: "get",
            url: `/roles/user/${userId}`
        },
        handleOnFirstRender: false
    })

    const {
        data: rolesData,
        isLoading: isLoadingRoles,
        handleRequest: loadRoles
    } = useApiRequest<IRequestRolesReturn>({
        defaultConfig: {
            method: "post",
            url: `/roles/search`,
        },
        handleOnFirstRender: false
    })

    const {
        isLoading: attachingRolesLoader,
        handleRequest: attachRoles
    } = useApiRequest<IRequestRolesReturn>({
        defaultConfig: {
            method: "post",
            url: `/roles/attach-to-user`,
            data: {
                user_id: userId,
                roles_ids: rolesToAttach
            }
        },
        handleOnFirstRender: false,
        successMessage: "Definição de perfis de acesso salva."
    })

    function handleClose(reload: boolean = false) {
        setRolesToAttach([]);
        turnModal({ reload, data: null });
    }

    function addOrRemoveRole(role_id: string) {
        let alreadyExists = rolesToAttach.findIndex(item => item === role_id);
        let new_array: string[] = rolesToAttach;

        if (alreadyExists !== -1) {
            let to_remove = rolesToAttach.slice(alreadyExists, (alreadyExists + 1));
            new_array = rolesToAttach.filter(item => {
                if (!to_remove.includes(item)) return item
            })

            setRolesToAttach(new_array);
        } else {
            setRolesToAttach(new_array.concat(role_id));
        }
    }

    useEffect(() => {
        if (rolesData !== null && userRolesData !== null) {
            let userRolesIds = userRolesData.roles.map(item => item.id);

            let checkeds = rolesData.roles.filter(item => {
                if (userRolesIds.includes(item.id)) return item;
            }).map(item => item.id);

            setRolesToAttach(checkeds);
        }
    }, [userRolesData, rolesData])

    useEffect(() => {
        if (isOpen === true) {
            loadUserRoles();
            loadRoles();
        }
    }, [isOpen])

    return (
        <Modal
            onClose={handleClose}
            size="2xl"
            isOpen={isOpen}
            scrollBehavior="outside"
        >
            <ModalOverlay />
            <ModalContent>
                <Container>
                    <ModalHeader width="100%" alignSelf="flex-start">Perfis de acesso do Usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="100%">
                        <div id="role-list">
                            <Alert status='info'>
                                <AlertIcon />
                                Habilite somente os perfis que deseja atribuir ao usuário.
                            </Alert>
                            {
                                (isLoadingRoles && isLoadingUserRoles) ?
                                    <div className="loader">
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />
                                    </div>
                                    :
                                    <FormControl as={SimpleGrid} columns={{ base: 1, lg: 4 }}>
                                        {
                                            (rolesData !== null && rolesToAttach) && rolesData.roles.map((item, idx) => {
                                                return (
                                                    <>
                                                        <FormLabel key={idx} htmlFor={`role-${idx}`}>{item.name}</FormLabel>
                                                        <Switch
                                                            key={`role-${idx}`}
                                                            id={`role-${idx}`}
                                                            isChecked={rolesToAttach.includes(item.id) ? true : false}
                                                            onChange={() => addOrRemoveRole(item.id)}
                                                        />
                                                    </>
                                                )
                                            })
                                        }
                                    </FormControl>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                        <Button onClick={() => handleClose()}>Fechar</Button>
                        <Button
                            type="submit"
                            isLoading={attachingRolesLoader}
                            rightIcon={<BsCheck2Circle />}
                            colorScheme="teal"
                            onClick={()=> attachRoles()}
                        >
                            Salvar
                        </Button>
                    </ModalFooter>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { AttachRoleToUserModal };
