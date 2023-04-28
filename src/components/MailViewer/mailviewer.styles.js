import styled from 'styled-components';

export const MailViewerWrapper = styled.div`
    width: 100%;
`;

export const MailViewerSubject = styled.div`
    padding: 1rem;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 1rem;
    font-weight: 600;
    box-shadow: 0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);
    background-color: ${(props) => props?.theme?.background?.light};
`;

export const MailViewerContent = styled.div`
    padding: 1rem;
    border-radius: 5px;
    width: 100%;
    min-height: calc(100vh - 215px);
    max-height: calc(100vh - 215px);
    scroll-behavior: auto;
    /* min-height: 500px; */
    box-shadow: 0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);
    background-color: ${(props) => props?.theme?.background?.light};
`;
