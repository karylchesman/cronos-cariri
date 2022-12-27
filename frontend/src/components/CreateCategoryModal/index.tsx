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
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BsCheck2Circle } from 'react-icons/bs';
import { ECategoryGenderType, ECategoryTypes, ICategory } from '../../context/stores/events';
import { useApiRequest } from '../../hooks/useApiRequest';

interface ICreateCategoryModalProps {
    isOpen: boolean;
    turnModal: ({ reload, data }: { reload: boolean, data: any | null }) => void;
    category: ICategory | null;
    eventId?: string;
}

interface ICreateOrUpdateCategoryInputs {
    id?: string;
    name: string;
    event_id: string;
    distance: number;
    start_age: number;
    end_age: number;
    category_type: ECategoryTypes;
    gender_type: ECategoryGenderType;
    order: number;
}

type IRequestCreateCategoryReturn = ICategory;

const CreateCategoryModal = ({ isOpen, turnModal, category, eventId }: ICreateCategoryModalProps) => {

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        reset: resetForm,
        getValues
    } = useForm<ICreateOrUpdateCategoryInputs>();

    function handleClose(reload: boolean = false) {
        resetForm();
        turnModal({ reload, data: null });
    }

    const {
        isLoading: isLoadingCreateCategory,
        handleRequest: handleCreateCategory
    } = useApiRequest<IRequestCreateCategoryReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: `Categoria ${category !== null ? "atualizada" : "criada"} com sucesso!`,
        onSuccess() {
            handleClose(true)
        },
    })

    async function onSubmit(data: ICreateOrUpdateCategoryInputs) {
        const config = {
            method: 'post',
            url: '/categories/create',
            data,
        }

        if (category !== null) {
            config.method = 'put'
            config.url = '/categories/update'
        }

        handleCreateCategory(config);
    }

    useEffect(() => {
        if (isOpen === true) {
            setValue("order", 0);
            setValue("event_id", String(eventId));
        }
        if (isOpen === true && category !== null) {
            setValue("id", category.id || "");
            setValue("name", category.name);
            setValue("event_id", category.event_id);
            setValue("distance", category.distance);
            setValue("start_age", category.start_age);
            setValue("end_age", category.end_age);
            setValue("category_type", category.category_type);
            setValue("gender_type", category.gender_type);
            setValue("order", category.order);
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
                        <ModalHeader width="100%" alignSelf="flex-start">{category !== null ? "Editando categoria" : "Nova categoria"}</ModalHeader>
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
                                <FormControl isInvalid={!!errors.distance}>
                                    <FormLabel>Distância (km)</FormLabel>
                                    <NumberInput
                                        onChange={(value) => {
                                            setValue("distance", Number(value))
                                        }}
                                    >
                                        <NumberInputField
                                            {...register("distance", {
                                                required: "Distância é obrigatório.",
                                                pattern: new RegExp(/[0-9]*(.[0-9]+)?/),
                                                valueAsNumber: true,
                                                min: {
                                                    value: 1,
                                                    message: "A distância deve ser maior ou igual a 1."
                                                }
                                            })}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{errors.distance?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box-group">
                                <FormControl isInvalid={!!errors.start_age}>
                                    <FormLabel>Idade Mínima</FormLabel>
                                    <NumberInput
                                        onChange={(value) => {
                                            setValue("start_age", Number(value))
                                        }}
                                    >
                                        <NumberInputField
                                            {...register("start_age", {
                                                required: "Idade mínima é obrigatório.",
                                                pattern: new RegExp(/[0-9]*(.[0-9]+)?/),
                                                valueAsNumber: true,
                                                min: {
                                                    value: 1,
                                                    message: "A idade mínima deve ser maior ou igual a 1."
                                                },
                                                max: {
                                                    value: 100,
                                                    message: "A idade mínima deve ser menor que 100."
                                                }
                                            })}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{errors.start_age?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.end_age}>
                                    <FormLabel>Idade Máxima</FormLabel>
                                    <NumberInput
                                        onChange={(value) => {
                                            setValue("end_age", Number(value))
                                        }}
                                    >
                                        <NumberInputField
                                            {...register("end_age", {
                                                required: "Idade máxima é obrigatório.",
                                                pattern: new RegExp(/[0-9]*(.[0-9]+)?/),
                                                valueAsNumber: true,
                                                min: {
                                                    value: 1,
                                                    message: "A idade máxima deve ser maior ou igual a 1."
                                                },
                                                max: {
                                                    value: 100,
                                                    message: "A idade máxima deve ser menor que 100."
                                                },
                                                validate: (value) => Number(getValues("start_age")) < Number(value) || "Idade máxima deve ser maior que idade inicial."
                                            })}

                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{errors.end_age?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.category_type}>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select
                                        {...register("category_type", {
                                            required: "Categoria é obrigatório.",
                                        })}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Solo">Solo</option>
                                        <option value="Dupla">Dupla</option>
                                        <option value="Quarteto">Quarteto</option>
                                        <option value="Sexteto">Sexteto</option>
                                        <option value="Octeto">Octeto</option>
                                    </Select>
                                    <FormErrorMessage>{errors.category_type?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <div className="input-box">
                                <FormControl isInvalid={!!errors.gender_type}>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select
                                        {...register("gender_type", {
                                            required: "Sexo é obrigatório.",
                                        })}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Misto">Misto</option>
                                    </Select>
                                    <FormErrorMessage>{errors.gender_type?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                        </ModalBody>
                        <ModalFooter width="100%" alignSelf="flex-end" gap={5}>
                            <Button onClick={() => handleClose()}>Fechar</Button>
                            <Button
                                type="submit"
                                isLoading={isLoadingCreateCategory}
                                rightIcon={<BsCheck2Circle />}
                                colorScheme={category !== null ? "yellow" : "teal"}
                                bgColor={category !== null ? "yellow.400" : "teal"}
                            >
                                {category !== null ? "Salvar" : "Cadastrar"}
                            </Button>
                        </ModalFooter>
                    </form>
                </Container>
            </ModalContent>
        </Modal>
    );
}

export { CreateCategoryModal };
