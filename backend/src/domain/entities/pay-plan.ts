import { Replace } from '../utils/replace';
import { UuidGender } from '../utils/uuid-gender';
import {
    isEmpty,
    isString,
    isValidLength,
    isValidNumberLength,
} from '../utils/validators';
import { BaseEntityProps } from './base-entity';

export interface PayPlanProps extends BaseEntityProps {
    id: string;
    name: string;
    event_id: string;
    banner_archive_id: string | null;
    elderly_discount: number | null;
    elderly_age: number | null;
    details: string;
    value: number | null;
}

class PayPlan {
    private props: PayPlanProps;

    constructor(
        props: Replace<
            PayPlanProps,
            {
                id?: string;
                elderly_discount?: number | null;
                elderly_age?: number | null;
                value?: number | null;
                banner_archive_id?: string | null;
            }
        >
    ) {
        this.props = {
            ...props,
            elderly_discount: !props.elderly_discount
                ? null
                : props.elderly_discount,
            elderly_age: !props.elderly_age ? null : props.elderly_age,
            banner_archive_id: !props.banner_archive_id
                ? null
                : props.banner_archive_id,
            value: !props.value ? null : props.value,
            id: props.id ?? UuidGender.genderV4(),
        };
    }

    public validate() {
        isEmpty(this.props.id, 'ID não especificado.');
        isValidLength({
            value: this.props.name,
            min: 3,
            max: 255,
            error_message:
                'O nome do plano deve conter no mínimo 3 e no máximo 255 caracteres.',
        });
        isEmpty(this.props.event_id, 'Evento não especificado.');
        this.props.banner_archive_id
            ? isString(
                  this.props.banner_archive_id,
                  'Identificador do banner inválido.'
              )
            : null;
        this.props.elderly_discount
            ? isValidNumberLength(
                  this.props.elderly_discount,
                  'O desconto melhor idade deve ser um número entre 1 e 100.',
                  1,
                  100
              )
            : null;
        this.props.elderly_age
            ? isValidNumberLength(
                  this.props.elderly_age,
                  'A idade do desconto melhor idade deve ser um número entre 1 e 100.',
                  1,
                  100
              )
            : null;
        this.props.value
            ? isValidNumberLength(
                  this.props.value,
                  'O valor base do plano deve ser um número maior que 1.',
                  1
              )
            : null;

        if (this.props.elderly_discount && !this.props.elderly_age) {
            throw new Error(
                'Se especificado um desconto para melhor idade, também deve ser definido uma idade mínima.'
            );
        }
    }

    getProps() {
        return this.props;
    }
}

export { PayPlan };
