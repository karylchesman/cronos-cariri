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

        gap: 10px;

        .actions {
            display: flex;
            justify-content: flex-end;
            flex-flow: row wrap;
            width: 100%;

            gap: 10px;
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
    padding: 0.5rem;

    border-radius: 0.45rem;

    border: 1px solid #cfd8dc;
    background: #fff;

    transition: 0.3s;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    }

    .content {
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
