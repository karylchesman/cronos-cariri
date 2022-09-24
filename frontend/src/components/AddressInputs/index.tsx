import { Container } from './styles';
import { FieldErrorsImpl, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Select, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { viaCepApi } from '../../services/ViaCepApi';
import { ibgeApi } from '../../services/ibgeApi';

interface IAddressInputs {
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
}

interface IAddressInputsProps {
    formHandlers: {
        setValue: UseFormSetValue<any>,
        getValues: UseFormGetValues<any>
        register: UseFormRegister<any>;
        errors: FieldErrorsImpl<IAddressInputs>;
        watch: UseFormWatch<any>
    }
}

type IViaCepResult = {
    bairro: string;
    cep: string;
    complemento: string;
    dd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
} | { erro: 'true' }

interface IIbgeEstadosResultItem {
    id: number;
    nome: string;
    regiao: { id: number, sigla: string, nome: string }
    sigla: string;
}

interface IIbgeCitiesResultItem {
    "id": number;
    "nome": string;
    "microrregiao": {
        "id": number;
        "nome": string;
        "mesorregiao": {
            "id": number;
            "nome": string;
            "UF": {
                "id": number;
                "sigla": string;
                "nome": string;
                "regiao": {
                    "id": number;
                    "sigla": string;
                    "nome": string;
                }
            }
        }
    },
    "regiao-imediata": {
        "id": number;
        "nome": string;
        "regiao-intermediaria": {
            "id": number;
            "nome": string;
            "UF": {
                "id": number;
                "sigla": string;
                "nome": string;
                "regiao": {
                    "id": number;
                    "sigla": string;
                    "nome": string;
                }
            }
        }
    }
}

const AddressInputs = ({ formHandlers: { register, errors, getValues, watch, setValue } }: IAddressInputsProps) => {
    const toast = useToast();

    const [states, setStates] = useState<IIbgeEstadosResultItem[]>([]);
    const watchState = watch("address_uf");
    const [cities, setCities] = useState<IIbgeCitiesResultItem[]>([]);
    const watchCity = watch("address_city")

    async function findByCep() {

        const toastError = () => toast({
            title: "CEP não encontrado ou inválido.",
            status: "warning",
            duration: 3000,
            variant: "left-accent",
            position: "top"
        })

        try {
            const result = await viaCepApi.get<IViaCepResult>(`/${getValues("address_cep")}/json`);

            if (!("erro" in result.data)) {
                setValue("address_uf", result.data.uf);
                setValue("address_street", result.data.logradouro);
                setValue("address_district", result.data.bairro);
                setValue("address_city", result.data.localidade);

                return;
            }

            toastError()
        } catch (error) {
            toastError()
        }
    }

    async function getStates(signal: AbortSignal) {
        try {
            const result = await ibgeApi.get<IIbgeEstadosResultItem[]>(`/v1/localidades/estados`, { signal });

            setStates(result.data);
        } catch (error: any) {
            if (error.name === "CanceledError") return;

            toast({
                title: "Nenhum UF encontrado",
                status: "warning",
                duration: 3000,
                variant: "left-accent",
                position: "top"
            })
        }
    }

    async function getCities(signal?: AbortSignal) {
        let state = states.find(item => item.sigla === getValues("address_uf"))
        if (state === undefined) return;
        try {
            const result = await ibgeApi.get<IIbgeCitiesResultItem[]>(`/v1/localidades/estados/${state.id}/municipios`, { signal });

            setCities(result.data);
        } catch (error: any) {
            if (error.name === "CanceledError") return;

            toast({
                title: "Nenhuma cidadde encontrada para esse UF",
                status: "warning",
                duration: 3000,
                variant: "left-accent",
                position: "top"
            })
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getStates(controller.signal);

        return () => {
            controller.abort();
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        getCities(controller.signal);

        return () => {
            controller.abort();
        }
    }, [watchState])

    return (
        <Container>
            <div className="address_street">
                <FormControl isInvalid={!!errors.address_street}>
                    <FormLabel>Rua</FormLabel>
                    <Input
                        {...register("address_street", {
                            required: "A rua é obrigatório.",
                            minLength: {
                                value: 2,
                                message: "O nome da rua deve conter no mínimo 2 caracteres."
                            },
                            maxLength: {
                                value: 255,
                                message: "O nome da rua deve conter no máximo 255 caracteres."
                            }
                        })}
                        type='text'
                    />
                    <FormErrorMessage>{errors.address_street?.message}</FormErrorMessage>
                </FormControl>
            </div>
            <div className="address_number">
                <FormControl isInvalid={!!errors.address_number}>
                    <FormLabel>Número</FormLabel>
                    <Input
                        {...register("address_number", {
                            required: "O número é obrigatório.",
                            minLength: {
                                value: 2,
                                message: "O número deve conter no mínimo 2 caracteres."
                            },
                            maxLength: {
                                value: 255,
                                message: "O número deve conter no máximo 255 caracteres."
                            }
                        })}
                        type='text'
                    />
                    <FormErrorMessage>{errors.address_number?.message}</FormErrorMessage>
                </FormControl>
            </div>
            <div className="address_district">
                <FormControl isInvalid={!!errors.address_district}>
                    <FormLabel>Bairro</FormLabel>
                    <Input
                        {...register("address_district", {
                            required: "O bairro é obrigatório.",
                            minLength: {
                                value: 2,
                                message: "O bairro deve conter no mínimo 2 caracteres."
                            },
                            maxLength: {
                                value: 255,
                                message: "O bairro deve conter no máximo 255 caracteres."
                            }
                        })}
                        type='text'
                    />
                    <FormErrorMessage>{errors.address_district?.message}</FormErrorMessage>
                </FormControl>
            </div>
            <div className="address_uf">
                <FormControl isInvalid={!!errors.address_uf}>
                    <FormLabel>UF</FormLabel>
                    <Select
                        placeholder='Selecione'
                        {...register("address_uf", {
                            required: "O UF é obrigatório.",
                        })}
                    >
                        {
                            states.length > 0 &&
                            states.map(item => {
                                return (
                                    <option key={item.id} value={item.sigla}>{item.sigla} - {item.nome}</option>
                                )
                            })
                        }
                    </Select>
                    <FormErrorMessage>{errors.address_uf?.message}</FormErrorMessage>
                </FormControl>
            </div>
            <div className="address_city">
                <FormControl isInvalid={!!errors.address_city}>
                    <FormLabel>Cidade</FormLabel>
                    <Select
                        placeholder='Selecione'
                        {...register("address_city", {
                            required: "A cidade é obrigatório.",
                        })}
                        value={watchCity}
                    >
                        {
                            cities.length > 0 &&
                            cities.map(item => {
                                if (getValues("address_city") === item.nome) {
                                    return (
                                        <option  key={item.id} value={item.nome}>{item.nome}</option>
                                    )
                                } else {
                                    return (
                                        <option key={item.id} value={item.nome}>{item.nome}</option>
                                    )
                                }
                            })
                        }
                    </Select>
                    <FormErrorMessage>{errors.address_city?.message}</FormErrorMessage>
                </FormControl>
            </div>
            <div className="address_cep">
                <FormControl isInvalid={!!errors.address_cep}>
                    <FormLabel>CEP</FormLabel>
                    <InputGroup>
                        <Input
                            {...register("address_cep", {
                                required: "O CEP é obrigatório.",
                                minLength: {
                                    value: 2,
                                    message: "O CEP deve conter no mínimo 8 caracteres."
                                },
                                maxLength: {
                                    value: 255,
                                    message: "O CEP deve conter no máximo 8 caracteres."
                                }
                            })}
                            type='text'
                        />
                        <InputRightElement width='5.7rem'>
                            <Button colorScheme="messenger" h='1.75rem' size='sm' onClick={() => findByCep()}>
                                Procurar
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.address_cep?.message}</FormErrorMessage>
                </FormControl>
            </div>
        </Container>
    );
}

export { AddressInputs };
