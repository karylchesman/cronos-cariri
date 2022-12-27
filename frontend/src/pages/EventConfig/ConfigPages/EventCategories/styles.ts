import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    .form-info {
        width: 100%;
        margin-bottom: 1rem;
    }

    .event-categories {
        width: 100%;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        gap: 10px;

        .actions {
            display: flex;
            justify-content: flex-end;
            flex-flow: row wrap;
            width: 100%;

            gap: 10px;
        }

        .no-categories {
            width: 100%;
            padding: 1rem;

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            color: #64b5f6;

            border-radius: 0.45rem;
            border: 3px dotted #64b5f6;
        }
    }
`;

export const CategoriesFlex = styled.div`
    display: flex;
    flex-flow: column nowrap;

    width: 100%;
    height: 100%;

    gap: 0.5rem;
`;

export const CategoryItem = styled.div`
    display: flex;
    width: 100%;

    border-radius: 0.375rem;
    border: 1px solid #cfd8dc;
    background: #fff;

    transition: 0.3s;
    overflow-x: hidden;

    &:hover {
        .content {
            border-left: 3px solid ${(props) => props.theme.colors.main};
        }
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .content {
        padding: 0.5rem;
        display: flex;
        width: 100%;
        flex-flow: row nowrap;
        gap: 0.7rem;

        .order {
            width: auto;

            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            gap: 0.7rem;

            color: ${(props) => props.theme.colors.main};

            svg {
                cursor: pointer;
            }
        }

        .config {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .content-data {
            width: 100%;

            .label {
                span {
                    font-weight: 500;
                    font-size: 0.7rem;
                    color: #90a4ae;
                }
                p {
                    margin: 0;
                    padding: 0;
                }
            }

            display: grid;

            .name {
                grid-area: name;
            }
            .age {
                grid-area: age;
            }
            .type {
                grid-area: type;
            }
            .gender {
                grid-area: gender;
            }
            .config {
                grid-area: config;
            }

            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            grid-template-areas:
                "name name name"
                "age type gender";

            @media screen and (max-width: 510px) {
                grid-template-areas:
                    "name name name"
                    "age age age"
                    "type type gender";
            }
        }
    }
`;
