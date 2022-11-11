import { MainContainer } from '../../components/MainContainer';
import { Container } from './styles';
import notFoundImage from '../../assets/not-found2.png';

const NotFound = () => {

    return (
        <MainContainer>
            <Container>
                <span className="number">404</span>
                <p className="message">Ops... o recurso que você procurava não existe ou não encontrado.</p>
                <img src={notFoundImage} alt="Não encontrado" />
            </Container>
        </MainContainer>
    );
}

export { NotFound };