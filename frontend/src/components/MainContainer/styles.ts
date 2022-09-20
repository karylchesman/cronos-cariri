import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: column;
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    /* min-height: var(--default-page-content-height); */
    flex-grow: 1;
    padding: 10px;
`;