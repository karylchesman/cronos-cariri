import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 50px;
`;

export const Carousel = styled.div`
    width: 100%;
    display: flex;
    max-height: 400px;
    max-width: 1024px;
    padding: 10px;

    background: #FFF;
    border-radius: 0.45rem;

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

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    --search-box-color: transparent;
    --icon-color: #B0BEC5;

    .search-box:hover, :focus-within{
        --search-box-color: ${props => props.theme.colors.gradient_main};
        --icon-color: #FFF;
    }

    .search-box{
        background: #FFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 5px;
        border-radius: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row nowrap;

        width: 100%;
        z-index: 100;

        

        .input-box{
            flex-grow: 1;
            
            input{
                width: 100%;
                border: none;
                background: #FFF;
                padding: 0.5rem;
                outline: none;

                margin-left: 10px;
            }
        }

        .search-button{
            height: 5rem;
            width: 5rem;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: 50%;

            background: var(--search-box-color);
            cursor: pointer;
            transition: .2s;

            .icon{
                color: var(--icon-color);
            }
        }
    }

    .advanced-filters{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;

        width: 95%;
        height: 0;
        padding: 0;
        opacity: 0;
        transition: .5s;
        overflow: hidden;

        background: #FFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 5px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;

        margin-top: -10px;

        .handles{
            width: 100%;
            padding: 0px 20px;
            margin-bottom: 5px;

            display: flex;
            justify-content: flex-end;
            flex-flow: row wrap;
            gap: 10px;
        }

        .filters{
            width: 100%;

            display: flex;
            flex-flow: row wrap;
            gap: 10px;

            padding: 0px 20px;
        }
    }

    :focus-within{
        .advanced-filters{
            height: auto;
            padding: 10px;
            padding-top: 15px;
            opacity: 1;
        }
    }

    .advanced-filters:hover{
        height: auto;
        padding: 10px;
        padding-top: 15px;
        opacity: 1;
    }
    
    .advanced-filters[data-empty-filter=false]{
        height: auto;
        padding: 10px;
        padding-top: 15px;
        opacity: 1;
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

    background: #FFF;
    border-radius: 0.45rem;

    padding: 20px;

    @media screen and (max-width: 975px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 694px){
        grid-template-columns: repeat(1, 1fr);
    }
`;
