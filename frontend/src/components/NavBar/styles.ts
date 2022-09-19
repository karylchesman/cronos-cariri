import styled from "styled-components";

interface IMenusItemProps {
    active: boolean;
}

export const Container = styled.div`
    width: 100%;
    height: ${props => props.theme.mensures.nav_bar_height};

    background: ${props => props.theme.nav_bar.background};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

    display: flex;
    justify-content: center;

    #box{
        width: 100%;
        height: 100%;
        max-width: 1024px;

        display: flex; 

        #logo{
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 10px;
        }

        #menu-bar{
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            .user-icon{
                width: auto;
                padding-left: 10px;
                margin-right: 10px;
                height: 100%;
                
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .hambuger-menu{
                display: none;
                margin-right: 10px;
            }

            @media screen and (max-width: 1023px){
                justify-content: flex-end;

                .hambuger-menu{
                    display: block;
                }
            }
        }
    }
`;

export const MenusWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media screen and (max-width: 1023px){
        display: none;
    }
`;

export const MenusItem = styled.div<IMenusItemProps>`
    height: 100%;
    width: 100%;
    max-width: 100px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font-weight: 500;
    font-size: ${props => props.active ? "16px" : "14px"};
    color: #FAFAFA;

    border-bottom: ${props => props.active ? "4px solid #FAFAFA" : "none"};

    transition: 0.2s;

    :hover{
        border-bottom: 4px solid #FAFAFA !important;
    }
`;

export const ButtonUserNotLogged = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 10px;
    
    padding: 5px 10px;
    border-radius: 6px;
    border: 0.8px solid #FFF;
    color: #FFF;
    
    transition: 0.3s;    

    :hover{
        color: ${props => props.theme.colors.text_primary};
        background: #FFF;
        cursor: pointer;
    }
`;