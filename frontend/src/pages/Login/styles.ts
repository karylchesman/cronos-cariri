import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    /* gap: 20px; */

    /* padding: 10px; */
    /* background: #FFF; */
    border-radius: 8px;

    #login{
        height: 100%;
        flex: 1;

        border-radius: 0 8px 8px 0;
        background: #FFF;
        padding: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        #formbox{
            width: 100%;
            max-width: 367px;
            height: 100%;
            max-height: 420px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .chakra-alert{
                margin-bottom: 10px; 
            }

            .icon{
                margin-bottom: 20px;
            }

            form{
                width: 100%;
                height: auto;

                display: flex;
                flex-direction: column;
                justify-content: center;
                
                .input-box{
                    margin-bottom: 20px;
                }
            }
        }
    }

    #register{
        flex: 0.8;
        height: 100%;

        border-radius: 8px 0 0 8px;
        background: ${props => props.theme.login.background};

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;

        .title{
            font-size: calc(1rem + 1.15vw);
            color: #FFF;
            font-weight: 500;
            text-align: center;
        }
        .message{
            margin-top: 20px;
            color: #FFF;
            text-align: center;
        }
        .register-button{
            margin-top: 10%;
        }
    }

    @media screen and (max-width: 900px){
        flex-flow: column nowrap;

        #login{
            order: 1;
            width: 100%;
            border-radius: 8px 8px 0 0;
        }

        #register{
            order: 2;
            width: 100%;
            border-radius: 0 0 8px 8px;
        }
    }
`;
