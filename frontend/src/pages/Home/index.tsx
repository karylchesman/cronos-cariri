import { useEffect, useRef } from "react";
import { MainContainer } from '../../components/MainContainer';
import { Carousel, Container, Events, EventSearch } from './styles';
import { Button, Input, InputGroup, InputRightElement, Tag, TagCloseButton, TagLabel, useToast } from '@chakra-ui/react';
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

import { BsSearch } from 'react-icons/bs';
import { VscSettings } from 'react-icons/vsc';
import { EventCard } from '../../components/EventCard';
import { FaEraser } from "react-icons/fa";

const Home = () => {

    const toast = useToast();
    const filters = Array.from({ length: 0 });

    useEffect(() => {
        if (window.location.pathname === "/session-expired") {
            toast({
                title: "Sessão expirada.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                variant: "left-accent",
                position: "top"
            })
        }
    }, [])

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
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=590&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzEyMDE2Mjg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1584415942461-0b87dda9cc2b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=420&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzEyMDE5MTE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1366" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide3} alt="" />
                        </SwiperSlide>
                    </Swiper>
                </Carousel>

                <EventSearch>
                    <div className="search-box">
                        <div className="input-box">
                            <input type="text" placeholder="Encontre seu evento aqui..." />
                        </div>
                        <div className="search-button">
                            <BsSearch className="icon" size="1.5rem" />
                        </div>
                    </div>
                    <div className="advanced-filters" data-empty-filter={filters.length > 0 ? "false" : "true"}>
                        <div className="handles">
                            {
                                filters.length > 0 ?
                                    <Button colorScheme='yellow' variant='ghost' rightIcon={<FaEraser />}>
                                        Limpar filtros
                                    </Button>
                                    : null
                            }

                            <Button colorScheme='twitter' variant='ghost' rightIcon={<VscSettings />}>
                                Filtros avançados
                            </Button>
                        </div>
                        <div className="filters">
                            {
                                filters.map((item, idx) => {
                                    return (
                                        <Tag
                                            size="sm"
                                            key={idx}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='twitter'
                                        >
                                            <TagLabel>Filtro {idx + 1}</TagLabel>
                                            <TagCloseButton />
                                        </Tag>
                                    )
                                })
                            }
                        </div>
                    </div>
                </EventSearch>

                <Events>
                    {/* <EventCard eventData={{ card_url: "https://via.placeholder.com/1240x1000" }} />
                    <EventCard eventData={{ card_url: "https://via.placeholder.com/300x420" }} />
                    <EventCard eventData={{ card_url: "https://via.placeholder.com/1000x900" }} /> */}
                    {/* <EventCard eventData={{ card_url: "https://source.unsplash.com/1000x1000/?running" }} /> */}
                    <EventCard eventData={{ card_url: "https://images.unsplash.com/photo-1480179087180-d9f0ec044897?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzExOTYwOTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500" }} />
                    <EventCard eventData={{ card_url: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzExOTYxOTU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1300" }} />
                    <EventCard eventData={{ card_url: "https://images.unsplash.com/photo-1513276193780-64b881470da8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzExOTYyMTc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000" }} />
                    <EventCard eventData={{ card_url: "https://images.unsplash.com/photo-1560354892-75d8f5d0b5e9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzEyMDIzMDg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" }} />
                    <EventCard eventData={{ card_url: "https://images.unsplash.com/photo-1500468756762-a401b6f17b46?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzEyMDIzMzk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" }} />
                    <EventCard eventData={{ card_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8cnVubmluZ3x8fHx8fDE2NzEyMDIzNjA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700" }} />
                </Events>
            </Container>
        </MainContainer>
    );
}

export { Home };