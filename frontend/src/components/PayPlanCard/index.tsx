import { Badge, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { BsChatTextFill } from 'react-icons/bs';
import { IPayPlan } from '../../pages/EventConfig/ConfigPages/EventPayplans';
import { CardContainer } from './styles';

interface IPayPlanCardProps {
    children?: JSX.Element | JSX.Element[];
    payplanProps: IPayPlan;
}

export const PayPlanCard = ({ children, payplanProps }: IPayPlanCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <CardContainer>
            <div className="image">
                <img src="/payment-background.png" alt="Pagamento Background" />
            </div>
            <div className="content">
                <div className="title">
                    {payplanProps.name}
                </div>
                <div className="details">
                    {/* {payplanProps.details.length < 179 ?
                        <>{payplanProps.details}</> :
                        <>
                            {payplanProps.details.slice(0, 180)}...&nbsp;
                            <Button onClick={onOpen} colorScheme='messenger' size='xs' variant="link">
                                mais
                            </Button>
                        </>
                    } */}
                    <Button onClick={onOpen} w="100%" colorScheme='messenger' size="lg" variant='outline'>
                        Ver detalhes&nbsp;<BsChatTextFill />
                    </Button>
                </div>
                <div className="value">
                    {
                        payplanProps.value ?
                            new Intl.NumberFormat('pt-bt', { style: 'currency', currency: 'BRL' }).format(payplanProps.value)
                            :
                            <Badge fontSize='1rem' colorScheme='green'>Gratuito</Badge>
                    }
                </div>
                <div className="discount">
                    {
                        payplanProps.elderly_discount &&
                        <>
                            <span>Desconto melhor idade</span>
                            <div>+{payplanProps.elderly_age} anos tem {payplanProps.elderly_discount}% de desconto</div>
                        </>
                    }
                </div>
                <div className="actions">
                    {children}
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalhes de {payplanProps.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {payplanProps.details}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </CardContainer>
    )
}
