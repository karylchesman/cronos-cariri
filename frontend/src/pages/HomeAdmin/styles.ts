import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    border-radius: 8px;

    #header{
        width: 100%;

        border-radius: 8px 8px 0 0;
        background: #FFF;
        padding: 20px;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        h1{
            font-size: calc(1rem + 1.2vw);
        }
    }

    #body{
        width: 100%;
        height: 100%;
        flex-grow: 1;

        border-radius: 0 0 8px 8px;
        background: #FFF;
        padding: 20px;

        display: flex;
        flex-flow: column nowrap;
    }
`;

export const MenuTitle = styled.div`
    width: 100%;
    padding: 10px;

    border-left: 4px solid ${props => props.theme.colors.main}50;
    background: ${props => props.theme.colors.main}20;
    text-align: start;
`;

export const MenuWrapper = styled.div`
    width: 100%;
    padding: 10px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    gap: 10px;

    margin-bottom: 30px;
`;

export const MenuItem = styled.div`
    min-width: 120px;
    height: 64px;

    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    border-radius: 10px;
    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.3s;

    span{
        font-size: 18px;
    }

    &:hover{
        cursor: pointer;
        border: 1px solid ${props => props.theme.colors.main};
        color: ${props => props.theme.colors.main};
        box-shadow: none;
    }
`;
