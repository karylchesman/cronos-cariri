import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    .form-info{
        width: 100%;
        margin-bottom: 1.5rem;
    }

    .form, form{
        width: 100%;
        height: 100%;
    }

    .form{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .copy-button{
        width: auto;
        align-self: flex-start;
        margin-bottom: 1.5rem;
    }
`;

export const FormGrid = styled.div`
    .name{ grid-area: name }
    .event_date{ grid-area: event_date }
    .event_time{ grid-area: event_time }
    .event_address{ 
        grid-area: event_address; 
        margin-bottom: 1.5rem;
    }
    .email{ grid-area: email }
    .phonenumber{ grid-area: phonenumber }
    .event_type{ grid-area: event_type }
    .inscription_limit_date{ grid-area: inscription_limit_date }
    .handles{ 
        grid-area: handles;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
    }

    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: auto;
    grid-gap: 10px;
    grid-template-areas:
        "name name"
        "event_date event_time"
        "event_address event_address"
        "email phonenumber"
        "event_type inscription_limit_date"
        "handles handles"
    ;

    @media screen and (max-width: 510px) {
        grid-template-areas:
            "name name"
            "event_date event_date"
            "event_time event_time"
            "event_address event_address"
            "email email"
            "phonenumber phonenumber"
            "event_type event_type"
            "inscription_limit_date inscription_limit_date"
            "handles handles"
        ;
    }
`;
