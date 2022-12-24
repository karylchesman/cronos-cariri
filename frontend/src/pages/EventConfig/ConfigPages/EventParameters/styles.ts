import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    .form-info {
        width: 100%;
        margin-bottom: 1rem;
    }

    .form {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    form {
        width: 100%;
        height: 100%;
    }
`;

export const FormFlex = styled.div`
    .handles {
        grid-area: handles;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
    }

    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    gap: 1.5rem;
    width: 100%;
    height: 100%;

    .email,
    .financial,
    .inscription-list {
        display: flex;
        flex-flow: column nowrap;
        gap: 1.5rem;

        padding: 10px;
        padding-top: 20px;

        border: 1px solid #bbdefb;
        border-radius: 0.45rem;
        position: relative;
    }

    .sub-title {
        position: absolute;
        top: -0.8rem;
        left: 2rem;

        font-size: 1rem;
        color: #3182ce;
        background-color: #fff;

        padding: 0 0.3rem;
    }
`;
