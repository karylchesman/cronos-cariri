import { UuidGender } from "../utils/uuid-gender";
import { isEmpty, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export enum EEventAttachmentTypes {
    "event_banner" = "event_banner",
    "event_card" = "event_card"
}

export interface EventAttachmentProps extends BaseEntityProps {
    id?: string;
    event_id: string;
    description?: string;
    attachment_type: EEventAttachmentTypes;
    filename: string;
    mimetype: string;
    archive: string;
}

class EventAttachment {
    private props: EventAttachmentProps;

    constructor(props: EventAttachmentProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isValidLength({ value: this.props.event_id, min: 3, max: 255, error_message: "Evento não definido." });
        this.props.description && isValidLength({ value: this.props.description, min: 3, max: 255, error_message: "A descrição da imagem deve conter entre 3 e 255 caracteres." });
        isValidLength({ value: this.props.filename, min: 3, max: 255, error_message: "O nome do arquivo deve conter entre 3 e 255 caracteres." });
        isEmpty(this.props.mimetype, "Tipo de arquivo não definido.");

        if (!EEventAttachmentTypes[this.props.attachment_type]) throw new Error("Tipo de arquivo inválido.");
        if (Buffer.isBuffer(this.props.archive)) throw new Error("Formato do arquivo inválido.");
    }

    getProps() {
        return this.props;
    }
}

export { EventAttachment }