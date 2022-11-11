import styled from "styled-components";

interface IContainerProps {
    show?: boolean;
}

interface IPageMenuProps {
    active?: boolean;
}

export const Container = styled.div<IContainerProps>`
    width: 100%;
    height: 100%;

    position: fixed;
    background: transparent;

    display: ${props => props.show === true ? "block" : "none"};
`;

export const PageMenu = styled.div<IPageMenuProps>`
    width: 100%;
    min-height: 40px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column nowrap;
    gap: 10px;

    border-left: ${props => props.active === true ? "4px solid "+props.theme.colors.main : "none"};
    
    transition: all 0.2s;
    transition: border-color 0s;

    span{
        margin-left: 5px;
        color: ${props => props.active === true ? props.theme.colors.main : "initial"};
    }

    :hover{
        cursor: pointer;
        background: ${props => props.theme.colors.main}20;
        border-left: 4px solid ${props => props.theme.colors.main}50;
    }
`;