import { useState } from 'react';
import { Banner, Container } from './styles';
import { Alert, AlertIcon, Box, Button, ListItem, Text, UnorderedList, useToast } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { BsCheck2Circle } from 'react-icons/bs';
import { IEventAttachment } from '../../../../context/stores/events';
import { InputFile } from '../../../../components/InputFile';

type IRequestUpdateEventBannerReturn = {
    event_card: IEventAttachment;
}

interface ISelectedBanner {
    file: File | null,
    url: string | null
}

const EventBannerAndCard = () => {
    const toast = useToast();
    const { events, eventsDispatch } = useAppContext();
    const [bannerFile, setBannerFile] = useState<ISelectedBanner>({ file: null, url: null });

    const {
        isLoading: isLoadingUpdateBanner,
        handleRequest: updateEventBanner
    } = useApiRequest<IRequestUpdateEventBannerReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: `Banner do evento atualizado.`,
        onSuccess: (data) => {
            eventsDispatch({ type: "events/select/set-banner", payload: data.event_card })
        }
    })

    async function onSubmit() {
        if (events.selected.event !== null && bannerFile.file !== null) {
            const form_data = new FormData();

            let allowedMimetypes = [
                "image/jpeg",
                "image/jpg",
                "image/png"
            ];

            let allowedSize = 5 * 1024 * 1024;

            if (!allowedMimetypes.includes(bannerFile.file.type)) {
                toast({
                    title: "Ops...",
                    description: "Tipo de arquivo inválido.",
                    status: "warning",
                    duration: 3000,
                    variant: "left-accent",
                    position: "top"
                })

                return;
            }

            if (bannerFile.file.size > allowedSize) {
                toast({
                    title: "Ops...",
                    description: "Tamanho do arquivo ultrapassa limite de 5mb(Megabytes).",
                    status: "warning",
                    duration: 3000,
                    variant: "left-accent",
                    position: "top"
                })

                return;
            }

            form_data.append("event_id", events.selected.event.id);
            form_data.append("banner", bannerFile.file);

            await updateEventBanner({
                method: "put",
                url: "/events/banner/update",
                data: form_data
            })
        } else {
            toast({
                title: "Ops...",
                description: "Por favor preencha o formulário corretamente.",
                status: "warning",
                duration: 3000,
                variant: "left-accent",
                position: "top"
            })
        }
    }

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
                    <Banner urlPath={bannerFile.url ? bannerFile.url : "https://via.placeholder.com/1300x325/E0E0E0/607D8B/?text=Recomendado+1360x325"} />
                </div>

                <Box w="100%" display="flex" justifyContent="flex-end">
                    <Button
                        isLoading={isLoadingUpdateBanner}
                        colorScheme='yellow'
                        bgColor="yellow.400"
                        variant='solid'
                        rightIcon={<BsCheck2Circle />}
                        onClick={onSubmit}
                    >
                        Salvar Banner
                    </Button>
                </Box>
            </div>

        </Container>
    );

}

export { EventBannerAndCard };