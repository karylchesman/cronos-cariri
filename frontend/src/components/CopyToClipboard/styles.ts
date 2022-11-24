import styled, { css } from "styled-components";

interface IContainerProps {
    active?: boolean;
}

export const Container = styled.div<IContainerProps>`
    width: auto;
    min-height: 40px;

    background: #ECEFF1;
    border-radius: 0.35rem;

    padding: 10px;

    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    transition: 0.2s;

    color: ${props => props.theme.colors.text_secondary};

    ${props => 
        props.active === true &&
            css`
            background: #B2DFDB;
            color: #00695C;
            font-weight: 500;
        `
    }
`;

