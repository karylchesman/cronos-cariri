import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    border-radius: 8px;

    #header{
        width: 100%;

        border-radius: 8px 8px 0 0;
        background: #FFF;
        padding: 20px;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        .button-return{
            margin-right: 10px;

            &:hover{
                cursor: pointer;
            }
        }

        h1{
            font-size: calc(1rem + 1.2vw);
        }
    }

    #body{
        width: 100%;
        height: 100%;
        flex-grow: 1;

        border-radius: 0 0 8px 8px;
        background: #FFF;
        padding: 20px;

        display: flex;
        flex-flow: column nowrap;

        .search-box{
            width: 100%;
            margin-bottom: 10px;
        }

        .table-box{
            width: 100%;
            height: 100%;
        }
    }
`;