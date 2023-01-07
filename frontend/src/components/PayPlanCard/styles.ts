import styled from "styled-components";

export const CardContainer = styled.div`
    max-width: 300px;
    min-height: 200px;

    display: flex;
    flex-flow: column nowrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    border-radius: 0.375rem;

    overflow: hidden;
    transition: 0.3s;

    &:hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
            rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }

    .image {
        flex: 1;

        img {
            aspect-ratio: 1/1;
            object-fit: cover;
            object-position: center;
        }
    }

    .content {
        flex: 3;
        padding: 0.5rem;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        grid-template-areas:
            "title title title title"
            "details details details details"
            "discount discount discount discount"
            "value value actions actions";
        grid-gap: 0.5rem;

        .title {
            grid-area: title;
            font-weight: 700;
            font-size: 1.5rem;
            color: ${(props) => props.theme.colors.text_primary};
        }
        .details {
            grid-area: details;
            color: ${(props) => props.theme.colors.text_secondary};
        }
        .discount {
            grid-area: discount;

            span {
                font-weight: 500;
            }
        }
        .value {
            grid-area: value;

            font-weight: 500;
            color: #2962ff;
            font-size: 1.3rem;

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .actions {
            grid-area: actions;
            height: 100%;

            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
`;
