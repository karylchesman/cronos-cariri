import { ReactNode } from 'react';
import { Footer } from '../Footer';
import { NavBar } from '../NavBar';
import './styles';
import { Container, Content } from './styles';

interface IMainContainerProps {
    children: ReactNode;
}

const MainContainer = ({ children }: IMainContainerProps) => {

    return (
        <Container>
            <NavBar />
            <Content>
                {children}
            </Content>
            <Footer />
        </Container>
    );
}

export { MainContainer };
