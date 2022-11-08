import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 2.5rem;
`;

export const FilterInput = styled.div`
    width: 100%;
    min-height: 2.5rem;
    border: 1px solid #E2E8F0;
    border-radius: 0.375rem;

    display: flex;
    flex-flow: row nowrap;
    padding-inline-start: 1rem;
    padding-inline-end: 0.7rem;

    .filters{
        flex-grow: 1;

        display: flex;
        flex-flow: row wrap;
        gap: 10px;

        padding: 5px;
        transition: 0.3s;

        &:hover{
           cursor: pointer;
        }
    }

    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
    }
`;



