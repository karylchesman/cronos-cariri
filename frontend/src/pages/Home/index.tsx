import { MainContainer } from '../../components/MainContainer';
import { Carousel, Container, EventBar, Events, EventSearch } from './styles';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.jpg';
import { MdDoubleArrow } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { VscSettings } from 'react-icons/vsc';
import { EventCard } from '../../components/EventCard';

const Home = () => {

    return (
        <MainContainer>
            <Container>
                <Carousel>
                    <Swiper
                        spaceBetween={30}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        pagination={{
                            type: "progressbar"
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide >
                            <img src={slide1} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide2} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide3} alt="" />
                        </SwiperSlide>
                    </Swiper>
                </Carousel>

                <EventBar>
                    {/* <span className="icon"><MdDoubleArrow size="auto" /></span> */}
                    <h1>Eventos</h1>
                    <span className="icon"><MdDoubleArrow size="auto" /></span>
                </EventBar>

                <EventSearch>
                    <div className="search-by-name">
                        <InputGroup>
                            <Input variant='outline' placeholder='Procure por nome...' />
                            <InputRightElement width='4.5rem'>
                                <Button variant="solid" colorScheme="twitter" h='1.75rem' size='sm' onClick={() => { }}>
                                    <BsSearch />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </div>

                    <div className="advanced-button">
                        <Button colorScheme="twitter" variant='solid'>
                            Filtros avançados&nbsp;<VscSettings />
                        </Button>
                    </div>

                    {/* <div className="advanced-filters">

                    </div> */}
                </EventSearch>

                <Events>
                    <EventCard eventData={{ banner_url: "https://via.placeholder.com/150" }} />
                    <EventCard eventData={{ banner_url: "https://via.placeholder.com/150x200" }} />
                    <EventCard eventData={{ banner_url: "https://via.placeholder.com/200x150" }} />
                </Events>
            </Container>
        </MainContainer>
    );
}

export { Home };