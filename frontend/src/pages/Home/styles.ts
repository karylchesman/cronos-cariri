import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
`;

export const Carousel = styled.div`
    width: 100%;
    display: flex;
    max-height: 400px;

    .swiper {
        flex-grow: 1;
        width: 100%;
        max-width: 1024px;
    }

    .swiper-slide {
        padding-top: 10px;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .swiper-pagination-progressbar-fill{
        background: ${props => props.theme.colors.main};
    }

`;

export const EventSearch = styled.div`
    width: calc(100% - 10px);
    max-width: 1024px;
    height: auto;

    background: #FFF;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 25px;
    border-radius: 50px;

    display: flex;
    flex-flow: column nowrap;
    gap: 15px;

    .search-by-name{
        width: 100%;
    }

    .advanced-filters{
        width: 100%;
        
        display: flex;
        flex-direction: row;


        .button-filter{
            display: flex;
            align-items: center;
        }

        .filters{
            flex-grow: 1;

            display: flex;
            flex-flow: row wrap;
            gap: 10px;
        }

        @media screen and (max-width: 640px){
            flex-direction: column;

            .button-filter{
                order: 1;
                margin-bottom: 20px;
                align-self: flex-end;
            }

            .filters{
                order: 2;
            }
        }
    }
`;

export const Events = styled.div`
    width: 100%;
    max-width: 1024px;
    height: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 15px;
    justify-items: center;

    padding: 20px;

    @media screen and (max-width: 975px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 694px){
        grid-template-columns: repeat(1, 1fr);
    }
`;
