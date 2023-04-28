import styled from 'styled-components';

export const MailListWrapper = styled.div`
    min-width: 400px;
    min-height: calc(100vh - 150px);
    max-height: calc(100vh - 150px);
    padding: 1rem 0;
    margin: 0 0.5rem;
    border-radius: 5px;
    height: 100%;
    box-shadow: 0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);
    background-color: ${(props) => props?.theme?.background?.light};
`;

export const MailListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 1rem;

    h1 {
        text-transform: capitalize;
    }
`;

export const MailWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MailItemWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid ${(props) => props?.theme?.background?.dark};
    border-left: 4px solid
        ${(props) => (props?.unread ? props?.theme?.primary?.medium : 'transparent')};
    padding: 1rem 0.5rem 1rem 0.5rem;
    transition: 0.3s all ease-in-out;
    background-color: ${(props) =>
        props?.activeMail
            ? props?.theme?.primary?.light
            : props?.flagged
            ? props?.theme?.constants?.flagged
            : 'transparent'};

    .select_checkbox {
        fill: ${(props) => props?.theme?.primary?.medium};
    }

    svg {
        cursor: pointer;
        opacity: 0;
    }

    &:hover {
        background-color: ${(props) => props?.theme?.background?.medium};
        svg {
            opacity: 1;
        }
    }
`;

export const MailContent = styled.div`
    margin: 0 1rem;
    width: 100%;

    .mail_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            font-weight: 600;
        }
    }

    .quick_actions {
        display: flex;
        align-items: center;

        button {
            margin-left: 0.2rem;

            &:hover {
                background-color: ${(props) => props?.activeMail && 'transparent'};
                border: 1px solid ${(props) => props?.activeMail && props?.theme?.primary?.medium};
            }

            svg {
                fill: ${(props) => props?.theme?.primary?.medium};
                stroke: ${(props) => props?.theme?.primary?.medium};
            }
        }
    }

    p {
        font-size: 0.8rem;
    }
`;
