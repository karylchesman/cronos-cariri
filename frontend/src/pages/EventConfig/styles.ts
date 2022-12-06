import styled from 'styled-components';

interface IConfigMenuProps {
    active?: boolean;
    disabled?: boolean;
}

interface IConfigBarProps {
    showConfigBar?: boolean;
}

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

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

        display: grid;
        grid-template-columns: 224px 1fr;
        grid-template-rows: auto;
        grid-template-areas: "config-area form-area";

        @media screen and (max-width: 925px){
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas: "form-area";

            .config-area{
                display: none;
            }
        }

        .config-area{
            /* position: relative; */
            background: #ECEFF1;
        }

        .form-area{
            grid-area: form-area;

            display: flex;
            flex-flow: column nowrap;
            gap: 0.5rem;
            width: 100%;
            height: 100%;

            padding: 20px;

            .form-title{
                width: 100%;
                padding: 10px;

                display: flex;
                justify-content: flex-start;
                gap: 10px;
                align-items: center;

                font-size: 1.5rem;
                background: ${props => props.theme.colors.main}20;
                border-left: 4px solid ${props => props.theme.colors.main}50;
            }
        }
    }
`;

export const ConfigBar = styled.div`
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
    /* position: sticky;
    top: 0; */

    border-radius: 0 0 0 8px;
`;

export const ConfigToggle = styled.div<IConfigBarProps>`
    min-width: 3rem;
    min-height: 2rem;
    padding: 15px;

    position: fixed;
    bottom: 100px;
    left: 0;
    z-index: 100;

    display: none;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    border-top-right-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;

    background: ${props => props.theme.colors.gradient_main};
    color: #FFF;

    transition: 0.3s;

    @media screen and (max-width: 925px){
        display: flex;
        display: ${props => props.showConfigBar ? "none" : "flex"};
        
        &:hover{
            min-width: 4rem;
            cursor: pointer;
        }
    }
`;

export const ConfigMenu = styled.div<IConfigMenuProps>`
    width: 100%;
    min-height: 50px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    padding: 5px 10px;
    background: ${props => props.active ? props.theme.colors.gradient_main : "#ECEFF1"};
    color: ${props => props.active ? "#FFF" : props.theme.colors.text_primary};
    font-weight: ${props => props.active ? "500" : "initial"};
    
    transition: 0.3s;
    cursor: ${props => props.disabled === false ? "pointer" : "not-allowed"};

    &:hover{
        background: ${props => props.active ? props.theme.colors.gradient_main : "#FFF"};
    }
`;
