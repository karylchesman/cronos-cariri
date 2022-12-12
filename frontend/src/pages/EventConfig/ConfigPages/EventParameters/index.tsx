import { useEffect } from 'react';
import { Container, FormFlex } from './styles';
import { Alert, AlertIcon, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Spinner, Switch, Text } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { IEventParameters } from '../../../../context/stores/events';
import { useForm } from 'react-hook-form';
import { BsCheck2Circle } from 'react-icons/bs';

type IRequestUpdateEventParametersReturn = IEventParameters;
type IRequestGetEventParametersReturn = {
    parameters: IEventParameters | null
};

interface IEventParametersInput {
    event_id: string;
    inscription_made_email: boolean;
    inscription_confirmed_email: boolean;
    inscription_canceled_email: boolean;
    show_inscription_list: string;
    pagseguro_token: string;
    pagseguro_email: string;
    pagseguro_api_link: string;
}

const EventParameters = () => {
    const { events, eventsDispatch } = useAppContext();
    const {
        handleSubmit,
        setValue,
        formState: { errors },
        register
    } = useForm<IEventParametersInput>();

    const {
        isLoading: isLoadingUpdateEventParameters,
        handleRequest: updateEventParameters
    } = useApiRequest<IRequestUpdateEventParametersReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: `Parametros do evento atualizados.`,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-parameters", payload: data })
        }
    })

    const {
        isLoading: isLoadingEventParameters,
        handleRequest: getEventParameters,
    } = useApiRequest<IRequestGetEventParametersReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        onSuccess: (data) => {
            if (!data.parameters) return;

            eventsDispatch({ type: "events/select/set-parameters", payload: data.parameters })
        }
    })

    async function onSubmit(data: IEventParametersInput) {
        await updateEventParameters({
            method: "put",
            url: "/events/parameters/update",
            data: data
        })
    }

    useEffect(() => {
        const controller = new AbortController();

        if (events.selected.event !== null) {
            setValue("event_id", events.selected.event.id)
            
            getEventParameters({
                signal: controller.signal,
                method: 'get',
                url: `/events/parameters/${events.selected.event.id}`
            })

            return () => {
                controller.abort()
            }
        }
    }, [])

    useEffect(() => {
        if (events.selected.parameters !== null) {
            setValue("event_id", events.selected.parameters.event_id);
            setValue("inscription_made_email", events.selected.parameters.inscription_made_email);
            setValue("inscription_confirmed_email", events.selected.parameters.inscription_confirmed_email);
            setValue("inscription_canceled_email", events.selected.parameters.inscription_canceled_email);
            setValue("show_inscription_list", events.selected.parameters.show_inscription_list);
            setValue("pagseguro_token", events.selected.parameters.pagseguro_token);
            setValue("pagseguro_email", events.selected.parameters.pagseguro_email);
            setValue("pagseguro_api_link", events.selected.parameters.pagseguro_api_link);
        }
    }, [events.selected.parameters])

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    Nesta seção você poderá editar parametros internos do evento.
                </Alert>
            </div>
            <div className="form">
                {
                    !isLoadingEventParameters ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormFlex>
                                <div className="email">
                                    <span className="sub-title">E-mail</span>
                                    <div className="inscription_made_email">
                                        <FormControl display='flex' alignItems='center'>
                                            <FormLabel htmlFor='inscription_made_email' mb='0'>
                                                Enviar e-mail após inscrição <Text as="b">realizada</Text>
                                            </FormLabel>
                                            <Switch id='inscription_made_email'
                                                {...register("inscription_made_email")}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="inscription_confirmed_email">
                                        <FormControl display='flex' alignItems='center'>
                                            <FormLabel htmlFor='inscription_confirmed_email' mb='0'>
                                                Enviar e-mail após inscrição <Text as="b">confirmada</Text>
                                            </FormLabel>
                                            <Switch id='inscription_confirmed_email'
                                                {...register("inscription_confirmed_email")}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="inscription_canceled_email">
                                        <FormControl display='flex' alignItems='center'>
                                            <FormLabel htmlFor='inscription_canceled_email' mb='0'>
                                                Enviar e-mail após inscrição <Text as="b">cancelada</Text>
                                            </FormLabel>
                                            <Switch id='inscription_canceled_email'
                                                {...register("inscription_canceled_email")}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="inscription-list">
                                    <span className="sub-title">Lista de inscritos</span>
                                    <div className="show_inscription_list">
                                        <FormControl isInvalid={!!errors.show_inscription_list}>
                                            <FormLabel>Exibição lista de inscritos</FormLabel>
                                            <Select
                                                placeholder='Selecione'
                                                {...register("show_inscription_list", {
                                                    required: "Tipo de exibição é obrigatório.",
                                                })}
                                            >
                                                <option value='Mostrar'>Mostrar</option>
                                                <option value='Não Mostrar'>Não Mostrar</option>
                                                <option value='Somente Confirmadas'>Somente Confirmadas</option>
                                            </Select>
                                            <FormErrorMessage>{errors.show_inscription_list?.message}</FormErrorMessage>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="financial">
                                    <span className="sub-title">Integração de pagamento</span>
                                    <div className="pagseguro_token">
                                        <FormControl isInvalid={!!errors.pagseguro_token}>
                                            <FormLabel>Token PagSeguro</FormLabel>
                                            <Input
                                                {...register("pagseguro_token", {
                                                    required: "Token do pagseguro é obrigatório."
                                                })}
                                                type='text'
                                            />
                                            <FormErrorMessage>{errors.pagseguro_token?.message}</FormErrorMessage>
                                        </FormControl>
                                    </div>
                                    <div className="pagseguro_email">
                                        <FormControl isInvalid={!!errors.pagseguro_email}>
                                            <FormLabel>Email conta pagseguro</FormLabel>
                                            <Input
                                                {...register("pagseguro_email", {
                                                    required: "Email da conta pagseguro é obrigatório.",
                                                    pattern: {
                                                        value: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
                                                        message: "O e-mail deve estar em formáto válido."
                                                    }
                                                })}
                                                type='email'
                                            />
                                            <FormErrorMessage>{errors.pagseguro_email?.message}</FormErrorMessage>
                                        </FormControl>
                                    </div>
                                    <div className="pagseguro_api_link">
                                        <FormControl isInvalid={!!errors.pagseguro_api_link}>
                                            <FormLabel>PagSeguro API Link</FormLabel>
                                            <Input
                                                {...register("pagseguro_api_link", {
                                                    required: "Link da api pagseguro é obrigatório."
                                                })}
                                                type='text'
                                            />
                                            <FormErrorMessage>{errors.pagseguro_api_link?.message}</FormErrorMessage>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="handles">
                                    <Button
                                        type="submit"
                                        isLoading={isLoadingUpdateEventParameters}
                                        rightIcon={<BsCheck2Circle />}
                                        colorScheme="yellow"
                                        bgColor="yellow.400"
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </FormFlex>
                        </form>
                        :
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                }

            </div>
        </Container>
    );
}

export { EventParameters };