import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .handle-page{
        :hover{
            cursor: pointer;
        }
    }
`;