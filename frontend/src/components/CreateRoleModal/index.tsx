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
import { IRole } from '../../@types/users';
import { useForm } from 'react-hook-form';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import { BsCheck2Circle } from 'react-icons/bs';

interface ICreateRoleModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    role: IRole | null;
}

interface ICreateOrUpdateRoleInputs {
    id?: string;
    name: string;
}

const CreateRoleModal = ({ isOpen, turnModal, role }: ICreateRoleModalProps) => {

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        reset: resetForm
    } = useForm<ICreateOrUpdateRoleInputs>();

    function handleClose(reload: boolean = false) {
        resetForm();
        turnModal({ reload, data: null });
    }

    const [isLoading, setIsloading] = useState(false);
    const toast = useToast();

    async function onSubmit(data: ICreateOrUpdateRoleInputs) {
        setIsloading(true);
        try {
            if (data.id) {
                await api.put("/roles/update", data);
            } else {
                await api.post("/roles/create", data);
            }

            toast({
                title: "Feito!",
                description: `Perfil de acesso ${data.id ? "atualizado" : "criado"} com sucesso.`,
                status: "success",
                duration: 3000,
                variant: "left-accent",
                position: "top"
            });

            handleClose(true);
        } catch (err: AxiosError | any) {
            toast({
                title: "Ops...",
                description: err.response ? err.response.data.error : "Falha ao tentar criar usuário.",
                status: "warning",
                duration: 3000,
                variant: "left-accent",
                position: "bottom"
            })
        }
        setIsloading(false);
    }

    useEffect(() => {
        if (isOpen === true && role !== null) {
            setValue("id", role.id || "");
            setValue("name", role.name);
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
                        <ModalHeader width="100%" alignSelf="flex-start">{role !== null ? "Editando perfil" : "Novo perfil"}</ModalHeader>
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
                        </ModalBody>
                        <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                            <Button onClick={() => handleClose()}>Fechar</Button>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                rightIcon={<BsCheck2Circle />}
                                colorScheme={role !== null ? "yellow" : "teal"}
                                bgColor={role !== null ? "yellow.400" : "teal"}
                            >
                                {role !== null ? "Salvar" : "Cadastrar"}
                            </Button>
                        </ModalFooter>
                    </form>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { CreateRoleModal };
