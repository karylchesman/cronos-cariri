import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: auto;

    padding: 10px;
    border-radius: .45rem;
    border: 1px solid #ECEFF1;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    flex-flow: row wrap;

    position: relative;

    .input-hidden{
        display: none;
    }

    .placeholder{
        overflow-x: hidden;
    }

    .clean-buttom{
        position: absolute;
        right: 10px;
        top: 10px;
    }

    @media screen and (max-width:530px) {
        flex-flow: column nowrap !important;
        justify-content: center;
        align-items: flex-start;
    }
`;

