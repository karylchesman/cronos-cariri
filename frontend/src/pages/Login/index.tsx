import { useState, useEffect } from 'react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../../hooks/useAppContext';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface IInputs {
    email: string;
    password: string;
}

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<IInputs>();
    const [submitError, setSubmitError] = useState<any>("");
    const [isLoading, setIsloading] = useState(false);
    const { user, handleLogin } = useAppContext();
    const toast = useToast();
    const pageNavigator = useNavigate();

    async function onSubmit(data: IInputs) {
        setIsloading(true);

        if (submitError !== "") {
            setSubmitError("");
        }

        try {

            await handleLogin(data.email, data.password);
        } catch (err: AxiosError | any) {
            setSubmitError(err.response ? err.response.data.error : "Falha ao tentar fazer login.");
        }
        setIsloading(false);
    }

    useEffect(() => {
        if (user !== null) {
            toast({
                title: "O usuário já está logado.",
                status: "success",
                duration: 3000,
                variant: "left-accent",
                position: "top"
            })

            const interval = setInterval(() => pageNavigator("/"), 3000);

            return () => {
                clearInterval(interval);
                toast.closeAll();
            }
        }
    }, [user])

    return (
        <MainContainer>
            <Container>
                <div id="register">
                    <span className="title">
                        Ainda não possui uma conta?
                    </span>

                    <p className="message">
                        Registre-se agora acessando o formulário de cadastro clicando no botão abaixo.
                    </p>

                    <div className="register-button">
                        <Button size="lg" colorScheme='gray' variant='outline' color="#FFF" _hover={{ color: "#000", background: "#FFF" }}>
                            Criar conta
                        </Button>
                    </div>
                </div>
                <div id="login">
                    <div id="formbox">
                        <div className="icon">
                            <FaUserCircle size="5rem" color="#B0BEC5" />
                        </div>
                        {
                            (submitError !== "") &&
                            <Alert status='error'>
                                <AlertIcon />
                                <Box flexGrow={1}>
                                    <AlertDescription>{submitError}</AlertDescription>
                                </Box>
                                <CloseButton onClick={() => setSubmitError("")} />
                            </Alert>
                        }
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        onChange={() => { }}
                                    />
                                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel>Senha</FormLabel>
                                    <Input
                                        {...register("password", {
                                            required: "Senha é obrigatória.",
                                            minLength: {
                                                value: 6,
                                                message: "A senha deve conter no mínimo 6 caracteres."
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "A senha deve conter no máximo 255 caracteres."
                                            }
                                        })}
                                        type='password'
                                        onChange={() => { }}
                                    />
                                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <Button
                                isLoading={isLoading}
                                loadingText='Aguarde'
                                colorScheme='green'
                                type="submit"
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </MainContainer>
    );
}

export { Login };