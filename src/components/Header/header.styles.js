import styled from 'styled-components';

export const HeaderWrapper = styled.header`
    position: relative;
    background-color: ${(props) => props?.theme?.primary?.medium};
    color: ${(props) => props?.theme?.constants?.text?.white};
    width: 100%;
    height: 50px;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0;
    box-shadow: 0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);

    .logo {
        font-size: 1.2rem;
        margin-right: 2rem;
    }

    .options_icon {
        visibility: hidden;
        fill: ${(props) => props?.theme?.constants?.text?.white};
    }

    @media screen and (max-width: 1024px) {
        .options_icon {
            cursor: pointer;
            visibility: visible;
        }
    }
`;

export const HeaderSearchWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    width: 500px;
    height: 40px;
    margin-right: auto;

    border-radius: 10px;
    background-color: ${(props) => props?.theme?.primary?.light};

    input {
        margin: 0 0.5rem;
        border: none;
        width: 100%;
        height: 30px;
        background: transparent;
        outline: none;
        color: ${(props) => props?.theme?.text};
    }

    svg {
        fill: ${(props) => props?.theme?.text};
    }
`;

export const HeaderQuickActions = styled.div`
    width: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props?.theme?.constants?.text?.white};

    @media screen and (max-width: 1024px) {
        position: absolute;
        top: 100%;
        right: 0;
        display: flex;
        min-width: 200px;
        flex-direction: column;
        background-color: ${(props) => props?.theme?.background?.medium};
    }
`;

export const HeaderQuickActionWrapper = styled.button`
    padding: 0 1rem;
    height: 50px;
    display: grid;
    border: none;
    place-items: center;
    background-color: transparent;
    color: ${(props) => props?.theme?.constants?.text?.white};

    svg {
        margin-right: ${(props) => (props?.hasTitle ? '1rem' : '0')};
    }

    &:hover,
    &:focus {
        cursor: pointer;
        background-color: ${(props) => props?.theme?.primary?.light};
    }

    @media screen and (max-width: 1024px) {
        color: ${(props) => props?.theme?.text};
    }
`;
