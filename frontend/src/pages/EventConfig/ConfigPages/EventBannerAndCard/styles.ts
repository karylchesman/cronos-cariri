import styled from 'styled-components';

interface IBannerProps {
    urlPath?: string;
}

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    .form-info{
        width: 100%;
        margin-bottom: 1rem;
    }

    .event-banner{
        width: 100%;

        display: flex;
        flex-flow: column nowrap;

        .file-chooser{
            margin-bottom: 10px;
        }

        .event-banner-demonstration{
            border-radius: .45rem;
            border: 1px solid #ECEFF1;

            height: 100%;
            display: flex;
            padding: 5px;
            margin-bottom: 10px;
        }
    } 
    
    .event-card{
        width: 100%;

        display: flex;
        flex-flow: column nowrap;

        .file-chooser{
            margin-bottom: 10px;
        }

        .event-card-demonstration{
            border-radius: .45rem;
            border: 1px solid #ECEFF1;

            height: 100%;

            display: flex;
            justify-content: space-around;
            gap:10px;

            padding: 5px;
            margin-bottom: 20px;
        }
    }
`;

export const Banner = styled.div<IBannerProps>`
    aspect-ratio: 4/1;
    width: 100%;
    background-image: url(${props => props.urlPath});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    border: none;
`;

