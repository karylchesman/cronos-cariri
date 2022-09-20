import { MainContainer } from '../../components/MainContainer';
import { Carousel, Container, EventBar, Events, EventSearch } from './styles';
import { Button, Input, InputGroup, InputRightElement, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
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
import running from '../../assets/running.png';

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
                    {/* <span className="icon"><MdDoubleArrow size="auto" /></span> */}
                    <div className="icon-im">
                        <img src={running} alt="running" />
                    </div>
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

                    <div className="advanced-filters">
                        <div className="filters">
                            {
                                Array.from({ length: 13 }).map((item, idx) => {
                                    return (
                                        <Tag
                                            size="sm"
                                            key={idx}
                                            borderRadius='full'
                                            variant='outline'
                                            colorScheme='gray'
                                        >
                                            <TagLabel>Filtro {idx}</TagLabel>
                                            <TagCloseButton />
                                        </Tag>
                                    )
                                })
                            }
                        </div>
                        <div className="button-filter">
                            <Button colorScheme="messenger" variant='outline' size="sm">
                                Filtros avançados&nbsp;<VscSettings />
                            </Button>
                        </div>
                    </div>

                </EventSearch>

                <Events>
                    {/* <EventCard eventData={{ banner_url: "https://via.placeholder.com/150" }} /> */}
                    <EventCard eventData={{ banner_url: "https://source.unsplash.com/1240x1000/?running" }} />
                    <EventCard eventData={{ banner_url: "https://source.unsplash.com/300x420/?running" }} />
                    <EventCard eventData={{ banner_url: "https://source.unsplash.com/1000x1000/?running" }} />
                </Events>
            </Container>
        </MainContainer>
    );
}

export { Home };