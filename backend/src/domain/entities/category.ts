import { Replace } from '../utils/replace';
import { UuidGender } from '../utils/uuid-gender';
import {
    isEmpty,
    isNumber,
    isValidLength,
    isValidNumberLength,
} from '../utils/validators';
import { BaseEntityProps } from './base-entity';

export enum ECategoryTypes {
    'Solo' = 'Solo',
    'Dupla' = 'Dupla',
    'Quarteto' = 'Quarteto',
    'Sexteto' = 'Sexteto',
    'Octeto' = 'Octeto',
}

export enum ECategoryGenderType {
    'Masculino' = 'Masculino',
    'Feminino' = 'Feminino',
    'Misto' = 'Misto',
}

export interface CategoryProps extends BaseEntityProps {
    id: string;
    name: string;
    event_id: string;
    distance: number;
    start_age: number;
    end_age: number;
    category_type: ECategoryTypes;
    gender_type: ECategoryGenderType;
    order: number;
}

class Category {
    private props: CategoryProps;

    constructor(props: Replace<CategoryProps, { id?: string }>) {
        this.props = {
            ...props,
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
                'O nome deve conter no mínimo 3 e no máximo 255 caracteres.',
        });
        isEmpty(this.props.event_id, 'Evento não especificado.');
        isValidNumberLength(
            this.props.distance,
            'Distância deve ser um número maior que 0.',
            0.1
        );
        isValidNumberLength(
            this.props.start_age,
            'Idedade inicial deve ser entre 1 e 100.',
            1,
            100
        );
        isValidNumberLength(
            this.props.end_age,
            'Idedade máxima deve ser entre 1 e 100.',
            1,
            100
        );
        isNumber(this.props.order, 'O ordenador deve ser um número.');

        if (!ECategoryTypes[this.props.category_type])
            throw new Error('Tipo de categoria inválida.');
        if (!ECategoryGenderType[this.props.gender_type])
            throw new Error('Sexo da categoria inválido.');
    }

    getProps() {
        return this.props;
    }
}

export { Category };
