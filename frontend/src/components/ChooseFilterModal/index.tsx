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
import { SearchObject, TOperatorObject } from '../../@types/search-object';
import { useForm } from 'react-hook-form';

export const OPERATORS: TOperatorObject = {
    "=": { types_allowed: ["string", "number", "boolean"], alias: "Igual" },
    "<": { types_allowed: ["number"], alias: "Menor que" },
    ">": { types_allowed: ["number"], alias: "Maior que" },
    "<=": { types_allowed: ["number"], alias: "Menor ou igual a..." },
    "=>": { types_allowed: ["number"], alias: "Maior ou igual a..." },
    "A*": { types_allowed: ["string",], alias: "Começa com" },
    "*A": { types_allowed: ["string",], alias: "Termina com" },
    "*A*": { types_allowed: ["string",], alias: "Contém" },
}

export type TFilterOptions = {
    alias: string;
    key: string;
    value_type?: "string" | "number" | "boolean"
}

interface ICreateRoleModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    filterOptions: TFilterOptions[];
    onChoose: (value: SearchObject<any>) => void;
    filterToEdit: SearchObject<any> | null;
}

interface IFormValues {
    field: string,
    operator: string,
    value: string | number | boolean
}

const ChooseFilterModal = ({ isOpen, turnModal, filterOptions, onChoose, filterToEdit }: ICreateRoleModalProps) => {

    const toast = useToast();

    const {
        register,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
        reset: resetForm,
        watch,
        resetField
    } = useForm<IFormValues>();

    const watchField = watch("field");

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
            value: data.value === "true" ? true : false
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
                                        onChange={() => {
                                            if (typeof getValues("value") === "boolean") {
                                                resetField("value")
                                            }
                                        }}
                                    >
                                        {
                                            Object.keys(OPERATORS).map((item, idx) => {
                                                let field_selected = filterOptions.find(item => item.key === getValues("field"))
                                                if (field_selected && OPERATORS[item].types_allowed.includes(field_selected.value_type ? field_selected.value_type : "string")) {
                                                    return (
                                                        <option key={idx} value={item}>{OPERATORS[item].alias}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </Select>
                                    <FormErrorMessage>{errors.operator?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.value}>
                                    <FormLabel>Valor</FormLabel>
                                    {
                                        watchField ? (() => {
                                            let field_selected = filterOptions.find(item => item.key === getValues("field"))

                                            if (field_selected && field_selected.value_type === "boolean") {
                                                return (
                                                    <Select
                                                        {...register("value", {
                                                            required: "Valor é obrigatório."
                                                        })}
                                                    >
                                                        <option key={1} value={"true"}>SIM</option>
                                                        <option key={2} value={"false"}>NÃO</option>
                                                    </Select>
                                                )
                                            }

                                            return (
                                                <Input
                                                    type='text'
                                                    {...register("value", {
                                                        required: "Valor é obrigatório."
                                                    })}
                                                />
                                            )
                                        })()
                                            :
                                            <Input
                                                type='text'
                                                disabled
                                            />
                                    }
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
