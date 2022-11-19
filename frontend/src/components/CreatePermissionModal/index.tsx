import { useState, useEffect } from 'react';
import { Container } from './styles';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from '@chakra-ui/react';
import { IPermission } from '../../@types/users';
import { useForm } from 'react-hook-form';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import { BsCheck2Circle } from 'react-icons/bs';

interface ICreatePermissionModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    permission: IPermission | null;
}

interface ICreateOrUpdatePermissionInputs {
    id?: string;
    name: string;
    identifier: string;
}

const CreatePermissionModal = ({ isOpen, turnModal, permission }: ICreatePermissionModalProps) => {

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        reset: resetForm
    } = useForm<ICreateOrUpdatePermissionInputs>();

    function handleClose(reload: boolean = false) {
        resetForm();
        turnModal({ reload, data: null });
    }

    const [isLoading, setIsloading] = useState(false);
    const toast = useToast();

    async function onSubmit(data: ICreateOrUpdatePermissionInputs) {
        setIsloading(true);
        try {
            if (data.id) {
                await api.put("/permissions/update", data);
            } else {
                await api.post("/permissions/create", data);
            }

            toast({
                title: "Feito!",
                description: `Permissão ${data.id ? "atualizada" : "criada"} com sucesso.`,
                status: "success",
                duration: 3000,
                variant: "left-accent",
                position: "top"
            });

            handleClose(true);
        } catch (err: AxiosError | any) {
            toast({
                title: "Ops...",
                description: err.response ? err.response.data.error : "Falha ao tentar comunicar-se com o servidor.",
                status: "warning",
                duration: 3000,
                variant: "left-accent",
                position: "bottom"
            })
        }
        setIsloading(false);
    }

    useEffect(() => {
        if (isOpen === true && permission !== null) {
            setValue("id", permission.id || "");
            setValue("name", permission.name);
            setValue("identifier", permission.identifier);
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader width="100%" alignSelf="flex-start">{permission !== null ? "Editando permissão" : "Nova permissão"}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody width="100%">
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.name}>
                                    <FormLabel>Nome</FormLabel>
                                    <Input
                                        {...register("name", {
                                            required: "Nome é obrigatório.",
                                            minLength: {
                                                value: 3,
                                                message: "O nome deve conter no mínimo 3 caracteres."
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "O nome deve conter no máximo 255 caracteres."
                                            }
                                        })}
                                        type='text'
                                    />
                                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.identifier}>
                                    <FormLabel>Identificador</FormLabel>
                                    <Input
                                        {...register("identifier", {
                                            required: "Identificador é obrigatório.",
                                            minLength: {
                                                value: 3,
                                                message: "O identificador deve conter no mínimo 3 caracteres."
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "O identificador deve conter no máximo 255 caracteres."
                                            }
                                        })}
                                        type='text'
                                    />
                                    <FormErrorMessage>{errors.identifier?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                        </ModalBody>
                        <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                            <Button onClick={() => handleClose()}>Fechar</Button>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                rightIcon={<BsCheck2Circle />}
                                colorScheme={permission !== null ? "yellow" : "teal"}
                                bgColor={permission !== null ? "yellow.400" : "teal"}
                            >
                                {permission !== null ? "Salvar" : "Cadastrar"}
                            </Button>
                        </ModalFooter>
                    </form>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { CreatePermissionModal };
