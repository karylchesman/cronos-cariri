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

interface IAttachPermissionToRoleModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    roleId: string | null;
}

type IRequestRolePermissionsReturn = IPermission[];

interface IRequestPermissionsReturn {
    permissions: IPermission[];
    registers: number;
}

const AttachPermissionToRoleModal = ({ isOpen, turnModal, roleId }: IAttachPermissionToRoleModalProps) => {

    const [permissionsToAttach, setPermissionsToAttach] = useState<string[]>([]);

    const {
        data: rolePermissionsData,
        isLoading: isLoadingRolePermissions,
        handleRequest: loadRolePermissions
    } = useApiRequest<IRequestRolePermissionsReturn>({
        defaultConfig: {
            method: "get",
            url: `/permissions/role/${roleId}`
        },
        handleOnFirstRender: false
    })

    const {
        data: permissionsData,
        isLoading: isLoadingPermissions,
        handleRequest: loadPermissions
    } = useApiRequest<IRequestPermissionsReturn>({
        defaultConfig: {
            method: "post",
            url: `/permissions/search`,
        },
        handleOnFirstRender: false
    })

    const {
        isLoading: attachingPermissionsLoader,
        handleRequest: attachPermissions
    } = useApiRequest({
        defaultConfig: {
            method: "post",
            url: `/permissions/attach-to-role`,
            data: {
                role_id: roleId,
                permissions_ids: permissionsToAttach
            }
        },
        handleOnFirstRender: false,
        successMessage: "Definição de permissões salva."
    })

    function handleClose(reload: boolean = false) {
        setPermissionsToAttach([]);
        turnModal({ reload, data: null });
    }

    function addOrRemovePermission(permission_id: string) {
        let alreadyExists = permissionsToAttach.findIndex(item => item === permission_id);
        let new_array: string[] = permissionsToAttach;

        if (alreadyExists !== -1) {
            let to_remove = permissionsToAttach.slice(alreadyExists, (alreadyExists + 1));
            new_array = permissionsToAttach.filter(item => {
                if (!to_remove.includes(item)) return item
            })

            setPermissionsToAttach(new_array);
        } else {
            setPermissionsToAttach(new_array.concat(permission_id));
        }
    }

    useEffect(() => {
        if (permissionsData !== null && rolePermissionsData !== null) {
            let rolePermissionsIds = rolePermissionsData.map(item => item.id);

            let checkeds = permissionsData.permissions.filter(item => {
                if (rolePermissionsIds.includes(item.id)) return item;
            }).map(item => item.id);

            setPermissionsToAttach(checkeds);
        }
    }, [rolePermissionsData, permissionsData])

    useEffect(() => {
        if (isOpen === true) {
            loadRolePermissions();
            loadPermissions();
        }
    }, [isOpen])

    return (
        <Modal
            onClose={handleClose}
            size="2xl"
            isOpen={isOpen}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <Container>
                    <ModalHeader width="100%" alignSelf="flex-start">Permissões do perfil</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width="100%">
                        <div id="role-list">
                            <Alert status='info'>
                                <AlertIcon />
                                Habilite somente as permissões que deseja atribuir ao perfil.
                            </Alert>
                            {
                                (isLoadingPermissions && isLoadingRolePermissions) ?
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
                                            (permissionsData !== null && permissionsToAttach) && permissionsData.permissions.map((item, idx) => {
                                                return (
                                                    <>
                                                        <FormLabel key={idx} htmlFor={`role-${idx}`}>{item.name}</FormLabel>
                                                        <Switch
                                                            key={`permission-${idx}`}
                                                            id={`permission-${idx}`}
                                                            isChecked={permissionsToAttach.includes(item.id) ? true : false}
                                                            onChange={() => addOrRemovePermission(item.id)}
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
                            isLoading={attachingPermissionsLoader}
                            rightIcon={<BsCheck2Circle />}
                            colorScheme="teal"
                            onClick={() => attachPermissions()}
                        >
                            Salvar
                        </Button>
                    </ModalFooter>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { AttachPermissionToRoleModal };
