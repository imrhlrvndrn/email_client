import styled from 'styled-components';

export const IconButton = ({ title = '', children, ...props }) => {
    return (
        <Button hasTitle={title} style={{ display: 'flex' }} {...props} tabIndex={0}>
            {children}
            {title && <p>{title}</p>}
        </Button>
    );
};

export const Button = styled.button`
    display: grid;
    border: none;
    place-items: center;
    transition: 0.3s all ease-in-out;

    svg {
        margin-right: ${(props) => (props?.hasTitle ? '0.5rem' : '0')};
    }

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const HeaderQuickActionButton = styled(IconButton)`
    background-color: transparent;
    padding: 0 1rem;
    height: 50px;
    color: ${(props) => props?.theme?.constants?.text?.white};

    &:hover,
    &:focus {
        background-color: ${(props) => props?.theme?.primary?.dark};
    }

    @media screen and (max-width: 1024px) {
        color: ${(props) => props?.theme?.text};
    }
`;

export const ToolbarButton = styled(IconButton)`
    padding: 0.2rem 0.5rem;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 5px;

    p {
        font-size: 0.9rem;
    }

    &.primary {
        color: ${(props) => props?.theme?.constants?.text?.white};
        background-color: ${(props) => props?.theme?.primary?.medium};

        &:hover {
            background-color: ${(props) => props?.theme?.primary?.dark};
        }
    }

    &:hover {
        border: 1px solid ${(props) => props?.theme?.background?.dark};
        background-color: ${(props) => props?.theme?.background?.medium};
    }
`;
