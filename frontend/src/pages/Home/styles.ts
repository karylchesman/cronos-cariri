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

export const EventBar = styled.div`
    width: 100%;
    height: 100%;
    max-height: 200px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 20px;

    border-top: 2px dashed #ECEFF1;
    padding-top: 20px;
   

    h1{
        font-size: calc(1.5rem + 1.5vw);
        font-weight: 700;
        font-style: italic;

        background-color: #f3ec78;
        background-image: linear-gradient(-45deg, #0D47A1, #2196F3);;
        background-size: 100%;
        background-clip: content-box;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-text-fill-color: transparent;
    }

    .icon-im img{
        width: 5rem;
    }
`;

export const EventSearch = styled.div`
    width: calc(100% - 10px);
    max-width: 900px;
    min-height: 100px;
    height: auto;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 15px 20px;
    border-radius: 20px;

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
`;
