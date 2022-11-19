import { UuidGender } from "../utils/uuid-gender";
import { isDateAfter, isDateAfterToday, isEmail, isPhoneNumber, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export enum EEventTypes {
    "MTB" = "MTB",
    "Trail" = "Trail",
    "Corrida de Rua" = "Corrida de Rua"
}

export enum EEventStatus {
    "Publicado" = "Publicado",
    "Não Publicado" = "Não Publicado",
    "Cancelado" = "Cancelado",
}

export enum EEventResultTypes {
    "Importação" = "Importação",
    "Integração" = "Integração",
    "PDF" = "PDF",
}

export interface EventProps extends BaseEntityProps {
    id?: string;
    name: string;
    event_date: Date;
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
    inscription_limit_date: Date;
    url_path: string;
    status?: EEventStatus;
    banner_archive_id?: string;
    card_archive_id?: string;
    result_type?: EEventResultTypes;
    details?: string;
}

class Event {
    private props: EventProps;

    constructor(props: EventProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        if (!props.status) {
            props.status = EEventStatus["Não Publicado"]
        }

        if (!props.address_number) {
            props.address_number = "S/N"
        }

        this.props = props;
    }

    public validate() {
        isValidLength({ value: this.props.name, min: 3, max: 255, error_message: "O nome deve conter no mínimo 3 no máximo 255 caracteres." });
        isDateAfterToday(this.props.event_date, "A data do evento deve ser superior a data atual.");
        isValidLength({ value: this.props.address_street, min: 2, max: 255, error_message: "O nome da rua deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_number, min: 2, max: 255, error_message: "O número da residência deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_district, min: 2, max: 255, error_message: "O nome do bairro deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_city, min: 2, max: 255, error_message: "O nome da cidade deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_uf, min: 2, max: 2, error_message: "O UF do estado deve conter 2 caracteres." });
        isValidLength({ value: this.props.address_cep, min: 8, max: 8, error_message: "O CEP deve conter 8 caracteres." });
        isValidLength({ value: this.props.url_path, min: 3, max: 255, error_message: "O caminho da url deve conter no mínimo 3 e no máximo 255 caracteres." });
        isEmail(this.props.email, "O e-mail deve conter formato válido.");
        this.props.phonenumber && isPhoneNumber(this.props.phonenumber, "O número de contato deve conter formato válido.");
        isDateAfter(this.props.event_date, this.props.inscription_limit_date, "A data limite das inscrições deve ser inferior a do evento.");
        this.validateEventType();
        this.validateEventStatus();
    }

    private validateEventType() {
        if (!EEventTypes[this.props.event_type]) throw new Error("O tipo de evento deve estar preenchido corretamente.")
    }

    private validateEventStatus() {
        if (!this.props.status || !EEventStatus[this.props.status]) throw new Error("O status de evento deve estar preenchido corretamente.")
    }

    // private generateUrlPath(value: string) {
    //     return value.toLocaleLowerCase().normalize("NFD").replace(/[^a-zA-Z\s0-9]/g, "").replace(/[\s]/g, "_");
    // }

    getProps() {
        return this.props;
    }
}

export { Event }