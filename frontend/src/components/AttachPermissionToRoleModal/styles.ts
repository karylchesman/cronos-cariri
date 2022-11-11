import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    .loader{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    #role-list{
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-flow: column nowrap;

        .chakra-alert{
            margin-bottom: 2rem;
        }
    }
`;

