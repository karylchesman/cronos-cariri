import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 20px;

    padding: 10px;
    background: #FFF;

    border-radius: 8px;

    .number{
        font-size: calc(3rem + 1.5vw);
    }

    .message{
        text-align: center;
        font-size: 18px;
        max-width: 400px;
    }

    img{
        width: 100%;
        max-width: 400px;
    }
`;
