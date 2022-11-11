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
import { EPersonGender, IPerson } from '../../@types/persons';
import { cpfMask } from '../../utils/masker';
import { AddressInputs } from '../AddressInputs';

interface IUpdatePersonModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    person: IPerson | null;
}

interface IUpdatePersonInputs {
    id: string;
    phonenumber1: string;
    phonenumber2?: string;
    gender: EPersonGender;
    cpf: string;
    rg?: string;
    bith_date: Date;
    blood_type?: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
}

const UpdatePersonModal = ({ isOpen, turnModal, person }: IUpdatePersonModalProps) => {

    const {
        register,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
        reset: resetForm,
        watch
    } = useForm<IUpdatePersonInputs>();

    function handleClose(reload: boolean = false) {
        resetForm();
        turnModal({ reload, data: null });
    }

    const [isLoading, setIsloading] = useState(false);
    const toast = useToast();

    async function onSubmit(data: IUpdatePersonInputs) {
        setIsloading(true);
        try {

            await api.put("/users/person/update", data);

            toast({
                title: "Feito!",
                description: `Dados pessoais atualizados com sucesso.`,
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
                position: "top"
            })
        }
        setIsloading(false);
    }

    useEffect(() => {
        if (isOpen === true && person !== null) {
            setValue("id", person.id || "");
            setValue("phonenumber1", person.phonenumber1);
            setValue("phonenumber2", person.phonenumber2);
            setValue("gender", person.gender);
            setValue("cpf", person.cpf);
            setValue("rg", person.rg);
            setValue("bith_date", person.bith_date);
            setValue("blood_type", person.blood_type);
            setValue("address_street", person.address_street);
            setValue("address_number", person.address_number);
            setValue("address_district", person.address_district);
            setValue("address_city", person.address_city);
            setValue("address_uf", person.address_uf);
            setValue("address_cep", person.address_cep);
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
                        <ModalHeader width="100%" alignSelf="flex-start">Editando dados pessoais</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody width="100%">
                            <div className="input-box">
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
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.phonenumber2}>
                                    <FormLabel>Contato 2</FormLabel>
                                    <Input
                                        {...register("phonenumber1", {
                                            pattern: {
                                                value: new RegExp(/^\(?[1-9]{2}\)?\s?([9]{1})?[0-9]{4}-?[0-9]{4}$/),
                                                message: "O número de contato 2 deve ter formato válido."
                                            }
                                        })}
                                        type='text'
                                    />
                                    <FormErrorMessage>{errors.phonenumber2?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
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
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.rg}>
                                    <FormLabel>RG</FormLabel>
                                    <Input
                                        {...register("rg", {
                                            pattern: {
                                                value: new RegExp(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/),
                                                message: "O CPF deve ter formato válido."
                                            }
                                        })}
                                        type='text'
                                        onChange={event => {
                                            setValue("rg", event.target.value)
                                        }}
                                    />
                                    <FormErrorMessage>{errors.rg?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
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
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.gender}>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select
                                        placeholder='Selecione...'
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
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.blood_type}>
                                    <FormLabel>Tipo sanguíneo</FormLabel>
                                    <Select
                                        placeholder='Selecione...'
                                        {...register("blood_type", {
                                            pattern: {
                                                value: new RegExp(/^([ABO]{1})([B+-]{1})([+-]{0,1})$/),
                                                message: "Tipo sanguíneo inválido."
                                            }
                                        })}
                                    >
                                        <option value='A+'>A+</option>
                                        <option value='B+'>B+</option>
                                        <option value='AB+'>AB+</option>
                                        <option value='O+'>O+</option>
                                        <option value='A-'>A-</option>
                                        <option value='B-'>B-</option>
                                        <option value='AB-'>AB-</option>
                                        <option value='O-'>O-</option>
                                    </Select>
                                    <FormErrorMessage>{errors.blood_type?.message}</FormErrorMessage>
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
                        </ModalBody>
                        <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                            <Button onClick={() => handleClose()}>Fechar</Button>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                rightIcon={<BsCheck2Circle />}
                                colorScheme="yellow"
                                bgColor="yellow.400"
                            >
                                Salvar
                            </Button>
                        </ModalFooter>
                    </form>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { UpdatePersonModal };
