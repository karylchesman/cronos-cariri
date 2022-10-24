import { useEffect, useRef, useState } from 'react';
import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Select, useToast } from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { EPersonGender } from '../../@types/persons';

import { cpfMask } from '../../utils/masker';
import { AddressInputs } from '../../components/AddressInputs';
import { BsCheck2Circle } from 'react-icons/bs';
import { api } from '../../services/ApiService';
import { AxiosError } from 'axios';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface IInputs {
    email: string;
    name: string;
    password: string;
    confirm_password: string;
    phonenumber1: string;
    gender: EPersonGender;
    cpf: string;
    bith_date: Date;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
}

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        getValues,
        setValue,
        watch
    } = useForm<IInputs>();

    const [isLoading, setIsloading] = useState(false);
    const toast = useToast();
    const pageNavigator = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);

    async function onSubmit(data: IInputs) {
        setIsloading(true);
        try {
            await api.post("/users/register", data);

            toast({
                title: "Usuário criado!",
                description: "Redirecionando para página de login...",
                status: "success",
                duration: 5000,
                variant: "left-accent",
                position: "top"
            });

            setTimeout(() => pageNavigator("/login"), 5000);
        } catch (err: AxiosError | any) {
            toast({
                title: "Ops...",
                description: err.response ? err.response.data.error : "Falha ao tentar criar usuário.",
                status: "warning",
                duration: 5000,
                variant: "left-accent",
                position: "bottom"
            })
        }
        setIsloading(false);
    }

    return (
        <MainContainer>
            <Container>
                <div id="register">
                    <div id="formbox">
                        <div className="icon">
                            <FaUserPlus size="5rem" color="#B0BEC5" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="email">
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
                            <div className="name">
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
                            <div className="password">
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel>Senha</FormLabel>

                                    <InputGroup>
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
                            <div className="confirm_password">
                                <FormControl isInvalid={!!errors.confirm_password}>
                                    <FormLabel>Confirmar senha</FormLabel>
                                    <InputGroup>
                                        <Input
                                            {...register("confirm_password", {
                                                required: "Senha de confirmação é obrigatória.",
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
                            <div className="phonenumber1">
                                <FormControl isInvalid={!!errors.phonenumber1}>
                                    <FormLabel>Contato</FormLabel>
                                    <Input
                                        {...register("phonenumber1", {
                                            required: "Número para contato é obrigatório.",
                                            pattern: {
                                                value: new RegExp(/^\(?[1-9]{2}\)?\s?([9]{1})?[0-9]{4}-?[0-9]{4}$/),
                                                message: "O número de contato deve ter formato válido."
                                            }
                                        })}
                                        type='text'
                                    />
                                    <FormErrorMessage>{errors.phonenumber1?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="gender">
                                <FormControl isInvalid={!!errors.bith_date}>
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <Input
                                        {...register("bith_date", {
                                            required: "Data de nascimento é obrigatória.",
                                        })}
                                        type='date'
                                    />
                                    <FormErrorMessage>{errors.bith_date?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="cpf">
                                <FormControl isInvalid={!!errors.cpf}>
                                    <FormLabel>CPF</FormLabel>
                                    <Input
                                        {...register("cpf", {
                                            required: "CPF é obrigatório.",
                                            pattern: {
                                                value: new RegExp(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/),
                                                message: "O CPF deve ter formato válido."
                                            }
                                        })}
                                        type='text'
                                        onChange={event => {
                                            setValue("cpf", cpfMask(event.target.value))
                                        }}
                                    />
                                    <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="bith_date">
                                <FormControl isInvalid={!!errors.gender}>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select
                                        placeholder='Selecione'
                                        {...register("gender", {
                                            required: "Sexo é obrigatório.",
                                        })}
                                    >
                                        <option value='Feminino'>Feminino</option>
                                        <option value='Masculino'>Masculino</option>
                                    </Select>
                                    <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="address">
                                <AddressInputs
                                    formHandlers={{
                                        setValue,
                                        watch,
                                        getValues,
                                        register,
                                        errors
                                    }}
                                />
                            </div>
                            <div className="button-box">
                                <Button
                                    isLoading={isLoading}
                                    loadingText='Aguarde'
                                    colorScheme='green'
                                    type="submit"
                                    rightIcon={<BsCheck2Circle />}
                                >
                                    Criar conta
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="already-registered">
                    Já possui uma conta?&nbsp;<Link to="/login">clique aqui</Link>&nbsp;e faça login.
                </div>
            </Container>
        </MainContainer>
    );
}

export { Register };