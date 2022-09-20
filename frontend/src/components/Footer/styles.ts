import styled from "styled-components";


export const Container = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    background: ${props => props.theme.footer.background};
    color: #FFF;
    font-size: 14px;

    .text-bold{
        font-weight: 700;
    }
`;

export const FooterLine = styled.div`
    width: 100%;
    height: 3px;

    background: ${props => props.theme.footer.top_line};
`;


export const Content = styled.div`
    width: 100%;
    max-width: 1024px;

    padding: 20px;
`;
