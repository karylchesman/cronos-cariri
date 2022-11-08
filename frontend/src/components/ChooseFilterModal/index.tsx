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
    Select,
    useToast,
} from '@chakra-ui/react';
import { BsCheck2Circle } from 'react-icons/bs';
import { SearchObject } from '../../utils/search-object';
import { useForm } from 'react-hook-form';

interface ICreateRoleModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    filterOptions: { alias: string, key: string }[];
    onChoose: (value: SearchObject<any>) => void;
    filterToEdit: SearchObject<any> | null;
}

interface IFormValues {
    field: string,
    operator: string,
    value: string
}

const ChooseFilterModal = ({ isOpen, turnModal, filterOptions, onChoose, filterToEdit }: ICreateRoleModalProps) => {

    const toast = useToast();

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        reset: resetForm
    } = useForm<IFormValues>();

    const operators = [
        { operator: "=", alias: "Igual" },
        { operator: "<", alias: "Menor que" },
        { operator: ">", alias: "Maior que" },
        { operator: "<=", alias: "Menor ou igual a..." },
        { operator: "=>", alias: "Maior ou igual a..." },
        { operator: "A*", alias: "Começa com" },
        { operator: "*A", alias: "Termina com" },
        { operator: "*A*", alias: "Contém" },
    ]

    function handleClose(reload: boolean = false) {
        resetForm();
        turnModal({ reload, data: null });
    }

    function onSubmit(data: IFormValues) {
        onChoose({
            alias: (() => {
                let aliasFound = filterOptions.find(item => item.key === data.field)
                return (aliasFound) ? aliasFound.alias : "";
            })(),
            key: data.field,
            operator: data.operator,
            value: data.value
        })
        toast({
            title: "Feito!",
            description: "Filtro adicionado.",
            status: "success",
            duration: 2000,
            variant: "left-accent",
            position: "top"
        });
    }

    useEffect(() => {
        if (filterToEdit !== null) {
            setValue("field", String(filterToEdit.key));
            setValue("operator", String(filterToEdit.operator));
            setValue("value", String(filterToEdit.value));
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
                        <ModalHeader width="100%" alignSelf="flex-start">Adicione filtros</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody width="100%">

                            <div className="input-box">
                                <FormControl isInvalid={!!errors.field}>
                                    <FormLabel>Escolha o campo</FormLabel>
                                    <Select
                                        {...register("field", {
                                            required: "Campo é obrigatório.",
                                            minLength: {
                                                value: 1,
                                                message: "Selecione um campo."
                                            }
                                        })}
                                    >
                                        <option key={"0"} value="">Selecione...</option>
                                        {
                                            filterOptions.map((item, idx) => {
                                                return (
                                                    <option key={idx + 1} value={item.key}>{item.alias}</option>
                                                )
                                            })
                                        }
                                    </Select>
                                    <FormErrorMessage>{errors.field?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.operator}>
                                    <FormLabel>Escolha o comparador</FormLabel>
                                    <Select
                                        {...register("operator", {
                                            required: "Comparador é obrigatório."
                                        })}
                                    >
                                        {
                                            operators.map((item, idx) => {
                                                return (
                                                    <option key={idx} value={item.operator}>{item.alias}</option>
                                                )
                                            })
                                        }
                                    </Select>
                                    <FormErrorMessage>{errors.operator?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.value}>
                                    <FormLabel>Valor</FormLabel>
                                    <Input
                                        type='text'
                                        {...register("value", {
                                            required: "Valor é obrigatório."
                                        })}
                                    />
                                    <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
                                </FormControl>
                            </div>

                        </ModalBody>
                        <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                            <Button onClick={() => handleClose()}>Fechar</Button>
                            <Button
                                type="submit"
                                rightIcon={<BsCheck2Circle />}
                                colorScheme="teal"
                            >
                                Adicionar
                            </Button>
                        </ModalFooter>
                    </form>
                </Container>
            </ModalContent>
        </Modal >
    );
}

export { ChooseFilterModal };
