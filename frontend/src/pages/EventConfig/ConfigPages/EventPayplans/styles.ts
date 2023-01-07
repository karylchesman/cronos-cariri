import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    .form-info {
        width: 100%;
        margin-bottom: 1rem;
    }

    .event-payplans {
        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        gap: 10px;

        .actions {
            display: flex;
            justify-content: flex-end;
            flex-flow: row wrap;
            width: 100%;

            gap: 10px;
            margin-bottom: 1rem;
        }

        .no-payplans {
            width: 100%;
            padding: 1rem;

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            color: #3182ce;

            border-radius: 0.45rem;
            border: 2.5px dotted #3182ce;
        }
    }
`;

export const PayplansFlex = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-template-rows: auto;
    justify-content: center;

    width: 100%;
    height: 100%;

    grid-gap: 0.5rem;
`;
