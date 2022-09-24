import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    border-radius: 8px;

    #register{
        width: 100%;
        height: 100%;
        flex-grow: 1;

        border-radius: 8px 8px 0 0;
        background: #FFF;
        padding: 20px;

        display: flex;
        align-items: center;

        #formbox{
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .icon{
                margin-bottom: 20px;
            }

            form{
                width: 100%;
                height: auto;

                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-template-rows: auto;
                gap: 10px;

                .email{grid-area: email;}
                .name{grid-area: name;}
                .password{grid-area: password;}
                .confirm_password{grid-area: confirm_password;}
                .phonenumber1{grid-area: phonenumber1;}
                .gender{grid-area: gender;}
                .cpf{grid-area: cpf;}
                .bith_date{grid-area: bith_date;}
                .address{
                    grid-area: address;
                    margin-bottom: 20px;
                }
                .button-box{
                    grid-area: button-box;
                    justify-self: end;
                }

                grid-template-areas:
                "name name name name"
                "email email email email"
                "password password confirm_password confirm_password"
                "cpf cpf gender gender"
                "phonenumber1 phonenumber1 bith_date bith_date"
                "address address address address"
                "button-box button-box button-box button-box"
                ;

                @media screen and (max-width: 425px) { 
                    grid-template-areas:
                    "name name name name"
                    "email email email email"
                    "password password password password"
                    "confirm_password confirm_password confirm_password confirm_password"
                    "phonenumber1 phonenumber1 phonenumber1 phonenumber1"
                    "gender gender gender gender"
                    "cpf cpf cpf cpf"
                    "bith_date bith_date bith_date bith_date"
                    "address address address address"
                    "button-box button-box button-box button-box"
                    ;
                }
            }
        }
    }

    #already-registered{
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        background: ${props => props.theme.login.background};
        color: #FFF;
        border-radius: 0 0 8px 8px;
        padding: 20px;

        a{
            font-weight: 700;
        }

        @media screen and (max-width: 405px) { 
            flex-direction: column !important;
        }
    }
`;
