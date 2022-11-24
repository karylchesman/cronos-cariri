import { useEffect, useRef, useState } from 'react';
import { Container } from './styles';
import { Alert, AlertIcon, Box, Button, Skeleton } from '@chakra-ui/react';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useApiRequest } from '../../../../hooks/useApiRequest';
import { Editor } from '@tinymce/tinymce-react';
import { BsCheck2Circle } from 'react-icons/bs';
import { Editor as TinyMCEEditor } from 'tinymce';

type IRequestUpdateEventDetailsReturn = {};

const EventDetails = () => {
    const { events, eventsDispatch } = useAppContext();
    const [loading, setLoading] = useState(false);
    const editorRef = useRef<TinyMCEEditor | null>(null);

    const {
        isLoading: isLoadingUpdateEventDetails,
        handleRequest: updateEventDetails
    } = useApiRequest<IRequestUpdateEventDetailsReturn>({
        defaultConfig: {},
        handleOnFirstRender: false,
        successMessage: `Detalhes do evento atualizados.`
    })

    async function onSubmit() {
        if (events.selected.event !== null && editorRef.current !== null) {
            let details = editorRef.current.getContent();

            let details_file = new File([details], "details.html", { type: "text/html" });

            const form_data = new FormData();

            form_data.append("event_id", events.selected.event.id);
            form_data.append("details", details_file);

            await updateEventDetails({
                method: "put",
                url: "/events/details/update",
                data: form_data
            })

            events.selected.event.details = details;
            eventsDispatch({ type: "events/select/set-event", payload: events.selected.event })
        }
    }

    function getInitalValue() {
        let default_value = "Detalhes do evento...";

        if (events.selected.event !== null) {
            if (events.selected.event.details !== null && events.selected.event.details !== undefined) {
                return events.selected.event.details;
            }
            return default_value;
        }
        return default_value;
    }

    return (
        <Container>
            <div className="form-info">
                <Alert status='info'>
                    <AlertIcon />
                    Nesta seção você poderá descrever mais detalhadamente seu evento, e o conteúdo desta seção será exibido na página do evento para os candidatos.
                </Alert>
            </div>
            <div className="details-editor">
                <Skeleton isLoaded={!loading} h="100%">
                    <Editor
                        apiKey={String(import.meta.env.VITE_TINY_MCE_KEY)}
                        onInit={(evt, editor) => {
                            editorRef.current = editor;
                            setLoading(false);
                        }}
                        initialValue={getInitalValue()}
                        init={{
                            language: "pt_BR",
                            height: "100%",
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | paste |' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | link image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
                            paste_tab_spaces: 2,
                            file_picker_types: 'image',
                            automatic_uploads: true,
                            image_title: true,
                        }}
                        id="tiny-box"
                    />
                </Skeleton>
            </div>
            <Box w="100%" display="flex" justifyContent="flex-end">
                <Button
                    isLoading={isLoadingUpdateEventDetails}
                    colorScheme='yellow'
                    bgColor="yellow.400"
                    variant='solid'
                    rightIcon={<BsCheck2Circle />}
                    onClick={onSubmit}
                >
                    Salvar
                </Button>
            </Box>
        </Container>
    );
}

export { EventDetails };