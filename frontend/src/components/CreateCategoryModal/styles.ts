import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    form {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-flow: column nowrap;

        .input-box {
            width: 100%;
            margin-bottom: 10px;
        }

        .input-box-group {
            display: flex;
            flex-flow: row nowrap;
            gap: 10px;

            width: 100%;
            margin-bottom: 10px;
        }
    }
`;
