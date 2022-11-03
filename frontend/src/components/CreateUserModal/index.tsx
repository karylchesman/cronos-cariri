import { useState, useEffect } from 'react';
import { Container } from './styles';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast
} from '@chakra-ui/react';
import { IUser } from '../../@types/users';
import { useForm } from 'react-hook-form';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface ICreateUserModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    user: IUser | null;
}

interface ICreateOrUpdateUserInputs {
    id?: string;
    name: string;
    email: string;
    password?: string;
    confirm_password?: string;
}

const CreateUserModal = ({ isOpen, turnModal, user }: ICreateUserModalProps) => {

    const {
        register,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
        reset: resetForm,
        resetField
    } = useForm<ICreateOrUpdateUserInputs>();

    function handleClose(reload: boolean = false) {
        resetForm();
        turnModal({ reload, data: null });
    }

    const [isLoading, setIsloading] = useState(false);
    const toast = useToast();
    const [passwordShow, setPasswordShow] = useState(false);

    async function onSubmit(data: ICreateOrUpdateUserInputs) {
        setIsloading(true);
        try {
            if (data.id) {
                if (data.password === "") {
                    data.password = undefined;
                }
                await api.put("/users/update", data);
            } else {
                await api.post("/users/create", data);
            }

            toast({
                title: "Feito!",
                description: `Usuário ${data.id ? "atualizado" : "criado"} com sucesso.`,
                status: "success",
                duration: 3000,
                variant: "left-accent",
                position: "bottom"
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
        if (isOpen === true && user !== null) {
            setValue("id", user.id || "");
            setValue("name", user.name);
            setValue("email", user.email);
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader width="100%" alignSelf="flex-start">{user !== null ? "Editando usuário" : "Novo usuário"}</ModalHeader>
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
                                <FormControl isInvalid={!!errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        {...register("email", {
                                            required: "Email é obrigatório.",
                                            pattern: {
                                                value: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
                                                message: "O e-mail deve estar em formáto válido."
                                            }
                                        })}
                                        type='email'
                                    />
                                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel>Senha</FormLabel>

                                    <InputGroup>
                                        <Input
                                            {...register("password", {
                                                required: user !== null ? false : "Senha é obrigatória.",
                                                minLength: {
                                                    value: 6,
                                                    message: "A senha deve conter no mínimo 6 caracteres."
                                                },
                                                maxLength: {
                                                    value: 255,
                                                    message: "A senha deve conter no máximo 255 caracteres."
                                                }
                                            })}
                                            type={passwordShow ? 'text' : 'password'}
                                            onChange={() => { }}
                                        />
                                        <InputRightElement width='3.7rem'>
                                            <Button colorScheme="messenger" h='1.75rem' size='sm' onClick={() => setPasswordShow((current) => !current)}>
                                                {
                                                    passwordShow ?
                                                        <MdVisibility />
                                                        :
                                                        <MdVisibilityOff />
                                                }
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.confirm_password}>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register("confirm_password", {
                                                required: user !== null ? false : "Senha de confirmação é obrigatória.",
                                                validate: (value) => value === getValues("password") || "As senhas não coincidem."
                                            })}
                                            type={passwordShow ? 'text' : 'password'}
                                        />
                                        <InputRightElement width='3.7rem'>
                                            <Button colorScheme="messenger" h='1.75rem' size='sm' onClick={() => setPasswordShow((current) => !current)}>
                                                {
                                                    passwordShow ?
                                                        <MdVisibility />
                                                        :
                                                        <MdVisibilityOff />
                                                }
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.confirm_password?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                        </ModalBody>
                        <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                            <Button onClick={() => handleClose()}>Fechar</Button>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                rightIcon={<BsCheck2Circle />}
                                colorScheme={user !== null ? "yellow" : "teal"}
                                bgColor={user !== null ? "yellow.400" : "teal"}
                            >
                                {user !== null ? "Salvar" : "Cadastrar"}
                            </Button>
                        </ModalFooter>
                    </form>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { CreateUserModal };
