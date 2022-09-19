import styled from "styled-components";

interface IContainerProps {
    backgroundImage: string;
}

export const Container = styled.div<IContainerProps>`
    width: 100%;
    max-width: 300px;
    height: 400px;

    border: 1px solid #ECEFF1;
    border-radius: 6px;

    overflow: hidden;
    position: relative;

    :hover{
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }

    #background-image{
        width: 100%;
        height: 100%;

        background-image: url(${props => props.backgroundImage});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;

        transition: all .5s;
    }

    #event-info{
        width: 100%;
        height: 50%;
        padding: 10px;

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        background-image: linear-gradient(to bottom, transparent 0%, black 100%);

        display: none;
        flex-flow: column nowrap;
        justify-content: flex-end;
        align-items: flex-start;

        transition: 0.5s;

        .name{
            width: 100%;
            margin-bottom: 10px;
            
            font-weight: 500;
            font-size: 22px;
            word-break: break-all;
            color: #FFF;
        }
        .subscription{
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            gap: 10px;
            margin-bottom: 20px;
        }
    }

    :hover ,
    :focus {
        border: none;
        #background-image{
            transform: scale(1.2);
        }

        #event-info{
            display: flex;
        }
    }
`;



