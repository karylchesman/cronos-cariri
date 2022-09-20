import { HTMLAttributes } from 'react';
import { Container, Content, FooterLine } from './styles';

interface IFooterProps extends HTMLAttributes<HTMLDivElement> { }

const Footer = ({ id }: IFooterProps) => {

    return (
        <Container id={id}>
            <FooterLine />
            <Content>
                <span className="text-bold">Copyright © 2015 - 2019 - Cronos Cariri.</span> Todos os direitos reservados.
            </Content>
        </Container>
    );
}

export { Footer };
