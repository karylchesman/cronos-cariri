import styled from 'styled-components';

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

    .details-editor{
        width: 100%;
        height: 100%;
    }

    .editor-visualizer{
        width: 100%;
        height: 100%;

        border: 1px solid #ECEFF1;
        border-radius: .45rem;
        padding: 10px;
    }
`;

