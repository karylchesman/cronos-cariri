import { useEffect, useState } from 'react';
import { Banner, Container } from './styles';
import { Alert, AlertIcon, Box, Button, ListItem, Text, UnorderedList, useToast } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { BsCheck2Circle } from 'react-icons/bs';
import { IEventAttachment } from '../../../../context/stores/events';
import { InputFile } from '../../../../components/InputFile';
import { EventCard } from '../../../../components/EventCard';

interface IRequestUpdateEventBannerReturn {
    event_banner: IEventAttachment;
}

interface IRequestGetEventBannerReturn extends IRequestUpdateEventBannerReturn { };

interface IRequestUpdateEventCardReturn {
    event_card: IEventAttachment;
}

interface IRequestGetEventCardReturn extends IRequestUpdateEventCardReturn { };

interface ISelectedFile {
    file: File | null,
    url: string | null
}

const EventBannerAndCard = () => {
    const toast = useToast();
    const { events, eventsDispatch } = useAppContext();
    const [bannerFile, setBannerFile] = useState<ISelectedFile>({ file: null, url: null });
    const [cardFile, setCardFile] = useState<ISelectedFile>({ file: null, url: null });

    const {
        isLoading: isLoadingUpdateBanner,
        handleRequest: updateEventBanner
    } = useApiRequest<IRequestUpdateEventBannerReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: `Banner do evento atualizado.`,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-banner", payload: data.event_banner })
        }
    })

    const {
        isLoading: isLoadingUpdateCard,
        handleRequest: updateEventCard
    } = useApiRequest<IRequestUpdateEventCardReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: `Capa do evento atualizada.`,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-card", payload: data.event_card })
        }
    })

    const {
        isLoading: isLoadingEventBanner,
        handleRequest: getEventBanner
    } = useApiRequest<IRequestGetEventBannerReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-banner", payload: data.event_banner })
        }
    })

    const {
        isLoading: isLoadingEventCard,
        handleRequest: getEventCard
    } = useApiRequest<IRequestGetEventCardReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-card", payload: data.event_card })
        }
    })

    function toastWarning(message: string) {
        toast({
            title: "Ops...",
            description: message,
            status: "warning",
            duration: 3000,
            variant: "left-accent",
            position: "top"
        })
    }

    function checkFileRequisites(file: File) {
        let allowedMimetypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        let allowedSize = 5 * 1024 * 1024;

        if (!allowedMimetypes.includes(file.type)) {
            toastWarning("Formato do arquivo de banner inválido.");
            return;
        }

        if (file.size > allowedSize) {
            toastWarning("Tamanho do arquivo ultrapassa limite de 5mb(Megabytes).");
            return;
        }
    }

    async function onSubmitBanner() {
        if (events.selected.event !== null && bannerFile.file !== null) {
            const form_data = new FormData();

            checkFileRequisites(bannerFile.file)

            form_data.append("event_id", events.selected.event.id);
            form_data.append("banner", bannerFile.file);

            await updateEventBanner({
                method: "put",
                url: "/events/banner/update",
                data: form_data
            })
        } else {
            toastWarning("Por favor preencha o formulário corretamente.");
        }
    }

    async function onSubmitCard() {
        if (events.selected.event !== null && cardFile.file !== null) {
            const form_data = new FormData();

            checkFileRequisites(cardFile.file)

            form_data.append("event_id", events.selected.event.id);
            form_data.append("card", cardFile.file);

            await updateEventCard({
                method: "put",
                url: "/events/card/update",
                data: form_data
            })
        } else {
            toastWarning("Por favor preencha o formulário corretamente.");
        }
    }

    useEffect(() => {
        if (events.selected.event !== null && events.selected.event.banner_archive_id !== null) {
            getEventBanner({
                method: "get",
                url: `/events/banner/data/${events.selected.event.id}/${events.selected.event.banner_archive_id}`
            })
        }

        if (events.selected.event !== null && events.selected.event.card_archive_id !== null) {
            getEventCard({
                method: "get",
                url: `/events/card/data/${events.selected.event.id}/${events.selected.event.card_archive_id}`
            })
        }
    }, [])

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    Nesta seção você poderá atualizar o banner do evento que será exibido na página dele, e a capa do evento que é a imagem que será exibida no buscador de eventos em miniatura.
                </Alert>
            </div>
            <div className="event-banner">
                <Text fontSize="2xl" mb="0.5rem">Escolha o banner</Text>
                <UnorderedList pl="1rem" mb="1rem">
                    <ListItem>Somente arquivos nos formatos .jpeg / .jpg / .png</ListItem>
                    <ListItem>Arquivos com no máximo 5mb(Megabyte)</ListItem>
                    <ListItem>Proporção da imagem 4/1</ListItem>
                </UnorderedList>
                <div className="file-chooser">
                    <InputFile
                        accept=".jpeg, .jpg, .png"
                        onFileChange={(files) => {
                            if (files.length > 0) {
                                let fileReader = new FileReader();
                                fileReader.readAsDataURL(files[0]);
                                fileReader.onload = () => {
                                    if (typeof fileReader.result === "string") {
                                        setBannerFile({
                                            file: files[0],
                                            url: fileReader.result
                                        })
                                    }
                                }

                                return;
                            }

                            setBannerFile({
                                file: null,
                                url: null
                            })
                        }}
                    />
                </div>

                <Text fontSize="md" mb="0.5rem">Pré-visualização do banner</Text>

                <div className="event-banner-demonstration">
                    {
                        (events.selected.banner !== null && bannerFile.url === null) ?
                            <Banner urlPath={`${String(import.meta.env.VITE_API_URL)}/events/banner/${events.selected.banner?.id}/${events.selected.banner?.filename}`} />
                            :
                            <Banner urlPath={bannerFile.url ? bannerFile.url : "https://via.placeholder.com/1300x325/E0E0E0/607D8B/?text=Recomendado+1360x325"} />
                    }
                </div>

                <Box w="100%" display="flex" justifyContent="flex-end">
                    <Button
                        isLoading={isLoadingUpdateBanner}
                        colorScheme='yellow'
                        bgColor="yellow.400"
                        variant='solid'
                        rightIcon={<BsCheck2Circle />}
                        onClick={onSubmitBanner}
                    >
                        Salvar Banner
                    </Button>
                </Box>
            </div>

            <div className="event-card">
                <Text fontSize="2xl" mb="0.5rem">Escolha a Capa</Text>
                <UnorderedList pl="1rem" mb="1rem">
                    <ListItem>Somente arquivos nos formatos .jpeg / .jpg / .png</ListItem>
                    <ListItem>Arquivos com no máximo 5mb(Megabyte)</ListItem>
                    <ListItem>Proporção da imagem 3/4</ListItem>
                </UnorderedList>
                <div className="file-chooser">
                    <InputFile
                        accept=".jpeg, .jpg, .png"
                        onFileChange={(files) => {
                            if (files.length > 0) {
                                let fileReader = new FileReader();
                                fileReader.readAsDataURL(files[0]);
                                fileReader.onload = () => {
                                    if (typeof fileReader.result === "string") {
                                        setCardFile({
                                            file: files[0],
                                            url: fileReader.result
                                        })
                                    }
                                }

                                return;
                            }

                            setCardFile({
                                file: null,
                                url: null
                            })
                        }}
                    />
                </div>

                <Text fontSize="md" mb="0.5rem">Pré-visualização da capa</Text>

                <div className="event-card-demonstration">
                    {
                        (events.selected.card !== null && cardFile.url === null) ?
                            <>
                                <EventCard eventData={{ card_url: `${String(import.meta.env.VITE_API_URL)}/events/card/${events.selected.card?.id}/${events.selected.card?.filename}` }} />
                                <EventCard autoFocus eventData={{ card_url: `${String(import.meta.env.VITE_API_URL)}/events/card/${events.selected.card?.id}/${events.selected.card?.filename}` }} />
                            </>
                            :
                            <>
                                <EventCard eventData={{ card_url: cardFile.url ? cardFile.url : "https://via.placeholder.com/650x866/E0E0E0/607D8B/?text=Recomendado+650x866" }} />
                                <EventCard autoFocus eventData={{ card_url: cardFile.url ? cardFile.url : "https://via.placeholder.com/650x866/E0E0E0/607D8B/?text=Recomendado+650x866" }} />
                            </>
                    }
                </div>

                <Box w="100%" display="flex" justifyContent="flex-end">
                    <Button
                        isLoading={isLoadingUpdateCard}
                        colorScheme='yellow'
                        bgColor="yellow.400"
                        variant='solid'
                        rightIcon={<BsCheck2Circle />}
                        onClick={onSubmitCard}
                    >
                        Salvar Capa
                    </Button>
                </Box>
            </div>
        </Container>
    );

}

export { EventBannerAndCard };