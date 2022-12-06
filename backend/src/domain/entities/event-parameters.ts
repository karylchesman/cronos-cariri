import { UuidGender } from "../utils/uuid-gender";
import { isBoolean, isEmail, isEmpty, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export enum EShowInscriptionListOption {
    "Mostrar" = "Mostrar",
    "Não Mostrar" = "Não Mostrar",
    "Somente Confirmadas" = "Somente Confirmadas"
}

export interface EventParametersProps extends BaseEntityProps {
    id?: string;
    event_id: string;
    inscription_made_email: boolean;
    inscription_confirmed_email: boolean;
    inscription_canceled_email: boolean;
    show_inscription_list: EShowInscriptionListOption;
    pagseguro_token: string;
    pagseguro_email: string;
    pagseguro_api_link: string;
}

class EventParameters {
    private props: EventParametersProps;

    constructor(props: EventParametersProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isValidLength({ value: this.props.event_id, min: 1, max: 255, error_message: "Evento não definido." });
        isBoolean(this.props.inscription_made_email, "Sinalização de envio de e-mail ao fazer inscrição deve conter valor verdadeiro ou falso.");
        isBoolean(this.props.inscription_confirmed_email, "Sinalização de envio de e-mail ao confirmar inscrição deve conter valor verdadeiro ou falso.");
        isBoolean(this.props.inscription_canceled_email, "Sinalização de envio de e-mail ao cancelar inscrição deve conter valor verdadeiro ou falso.");
        if (!EShowInscriptionListOption[this.props.show_inscription_list]) throw new Error("Tipo de listagem de inscrições inválida.");
        isEmpty(this.props.pagseguro_token, "Token do pagseguro inválido.");
        isEmail(this.props.pagseguro_email, "Conta de E-mail do pagseguro inválida.");
        isEmpty(this.props.pagseguro_api_link, "Link de api do pagseguro inválida.");
    }

    getProps() {
        return this.props;
    }
}

export { EventParameters }