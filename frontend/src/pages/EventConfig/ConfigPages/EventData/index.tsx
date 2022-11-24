import { useEffect } from 'react';
import { Container, FormGrid } from './styles';
// import PermissionsGate from '../../helpers/PermissionsGate';
import { Alert, AlertIcon, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Spinner, Text, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EEventTypes, IEvent } from '../../../../context/stores/events';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { phonenumberMask } from '../../../../utils/masker';
import { AddressInputs } from '../../../../components/AddressInputs';
import { BsCheck2Circle } from 'react-icons/bs';
import { useAppContext } from '../../../../hooks/useAppContext';
import dayjs from 'dayjs';
import { CopyToClipboard } from '../../../../components/CopyToClipboard';

interface ICreateEventInputs {
    id?: string;
    name: string;
    event_date: Date | string;
    event_time: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
    email: string;
    phonenumber?: string;
    event_type: EEventTypes;
    inscription_limit_date: Date | string;
}

type IRequestCreateOrUpdateEventReturn = IEvent;

const EventData = () => {
    const location = useLocation();
    const { event_url } = useParams<{ event_url: string }>();
    const { events, eventsDispatch } = useAppContext();
    const pageNavigator = useNavigate();
    const eventCreation = location.pathname === "/event/new" ? true : false;
    const {
        handleSubmit,
        setValue,
        formState: { errors },
        register,
        watch,
        getValues,
        reset: resetForm
    } = useForm<ICreateEventInputs>();

    const {
        isLoading: isLoadingEvent,
        handleRequest: getEvent
    } = useApiRequest<IRequestCreateOrUpdateEventReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-event", payload: data });
        }
    })

    const {
        isLoading: isLoadingCreateEvent,
        handleRequest: createOrUpdateEvent
    } = useApiRequest<IRequestCreateOrUpdateEventReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        onSuccess: (data, requestConfig) => {
            if (requestConfig.url === "/events/create") {
                pageNavigator(`/event/${data.url_path}/config`);
            }
            eventsDispatch({ type: "events/select/set-event", payload: data });
        },
        successMessage: `Evento ${getValues("id") === undefined ? "criado" : "atualizado"} com sucesso.`
    })

    async function onSubmit(data: ICreateEventInputs) {
        let url = "/events/create";
        let method = "post";

        if (data.id) {
            url = "/events/basic-info/update"
            method = "put";
        }

        await createOrUpdateEvent({
            method,
            url,
            data: data
        })
    }

    async function loadEvent() {
        await getEvent({
            method: "get",
            url: `/events/url/${event_url}/config`
        })
    }

    useEffect(() => {
        if (event_url !== undefined) {
            loadEvent();
        }
    }, [])

    useEffect(() => {
        if (events.selected.event !== null && eventCreation === false) {
            resetForm();

            setValue("id", events.selected.event.id);
            setValue("name", events.selected.event.name);
            setValue("event_date", dayjs(events.selected.event.event_date).format("YYYY-MM-DD"));
            setValue("event_time", events.selected.event.event_time);
            setValue("address_street", events.selected.event.address_street);
            setValue("address_number", events.selected.event.address_number);
            setValue("address_district", events.selected.event.address_district);
            setValue("address_city", events.selected.event.address_city);
            setValue("address_uf", events.selected.event.address_uf);
            setValue("address_cep", events.selected.event.address_cep);
            setValue("email", events.selected.event.email);
            setValue("phonenumber", events.selected.event.phonenumber);
            setValue("event_type", events.selected.event.event_type);
            setValue("inscription_limit_date", dayjs(events.selected.event.inscription_limit_date).format("YYYY-MM-DD"));
        }
    }, [events.selected.event, location])

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    {
                        eventCreation ?
                            "Para poder configurar demais parametros do evento, você primeiramente deve preencher o formulário abaixo e criá-lo."
                            :
                            "Nesta página você pode editar as informações básicas do evento."
                    }
                </Alert>
            </div>
            {
                events.selected.event !== null &&
                <div className="copy-button">
                    <Text fontSize='md' mb="1rem">Compartilhe o link do seu evento copiando abaixo!</Text>
                    <CopyToClipboard text={import.meta.env.VITE_APP_URL + "/event/" + events.selected.event.url_path} />
                </div>

            }
            <div className="form">
                {
                    !isLoadingEvent ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGrid>
                                <div className="name">
                                    <FormControl isInvalid={!!errors.name} mb="1rem">
                                        <FormLabel>Nome do evento</FormLabel>
                                        <Input
                                            {...register("name", {
                                                required: "Nome do evento é obrigatório.",
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
                                <div className="event_date">
                                    <FormControl isInvalid={!!errors.event_date} mb="1rem">
                                        <FormLabel>Data do evento</FormLabel>
                                        <Input
                                            {...register("event_date", {
                                                required: "Data do evento é obrigatória."
                                            })}
                                            type='date'
                                        />
                                        <FormErrorMessage>{errors.event_date?.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                <div className="event_time">
                                    <FormControl isInvalid={!!errors.event_time} mb="1rem">
                                        <FormLabel>Horário do evento</FormLabel>
                                        <Input
                                            {...register("event_time", {
                                                required: "Horário do evento é obrigatório."
                                            })}
                                            type='time'
                                        />
                                        <FormErrorMessage>{errors.event_time?.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                <div className="email">
                                    <FormControl isInvalid={!!errors.email} mb="1rem">
                                        <FormLabel>E-mail de contato do evento</FormLabel>
                                        <Input
                                            {...register("email", {
                                                required: "E-mail do evento é obrigatório.",
                                                minLength: {
                                                    value: 1,
                                                    message: "O e-mail deve conter no mínimo 1 caracteres."
                                                },
                                                maxLength: {
                                                    value: 255,
                                                    message: "O e-mail deve conter no máximo 255 caracteres."
                                                }
                                            })}
                                            type='email'
                                        />
                                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                <div className="phonenumber">
                                    <FormControl isInvalid={!!errors.phonenumber} mb="1rem">
                                        <FormLabel>Contato do evento</FormLabel>
                                        <Input
                                            {...register("phonenumber", {
                                                pattern: {
                                                    value: new RegExp(/^\(?[1-9]{2}\)?\s?([9]{1})?\s?[0-9]{4}-?[0-9]{4}$/),
                                                    message: "Este formato de telefone não é valido."
                                                }
                                            })}
                                            type='text'
                                            onChange={event => {
                                                let value = phonenumberMask(event.target.value);

                                                setValue("phonenumber", value);
                                            }}
                                        />
                                        <FormErrorMessage>{errors.phonenumber?.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                <div className="event_type">
                                    <FormControl isInvalid={!!errors.event_type} mb="1rem">
                                        <FormLabel>Tipo de evento</FormLabel>
                                        <Select
                                            {...register("event_type", {
                                                required: "Tipo do evento é obrigatório."
                                            })}
                                            placeholder='Selecione...'
                                        >
                                            <option value="MTB">MTB</option>
                                            <option value='Trail'>Trail</option>
                                            <option value='Corrida de Rua'>Corrida de Rua</option>
                                        </Select>
                                        <FormErrorMessage>{errors.event_type?.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                <div className="inscription_limit_date">
                                    <FormControl isInvalid={!!errors.inscription_limit_date}>
                                        <FormLabel>Data limite de inscrições</FormLabel>
                                        <Input
                                            {...register("inscription_limit_date", {
                                                required: "Data limite de inscrições é obrigatória."
                                            })}
                                            type='date'
                                        />
                                        <FormErrorMessage>{errors.inscription_limit_date?.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                <div className="event_address">
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
                                <div className="handles">
                                    <Button
                                        type="submit"
                                        isLoading={isLoadingCreateEvent}
                                        rightIcon={<BsCheck2Circle />}
                                        colorScheme={!eventCreation ? "yellow" : "teal"}
                                        bgColor={!eventCreation ? "yellow.400" : "teal"}
                                    >
                                        {!eventCreation ? "Salvar" : "Criar"}
                                    </Button>
                                </div>
                            </FormGrid>
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

export { EventData };