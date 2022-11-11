import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 10px;

    @media screen and (max-width: 710px) { 
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 445px) { 
        grid-template-columns: repeat(1, 1fr);
    }
`;