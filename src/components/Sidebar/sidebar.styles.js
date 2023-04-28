import Link from 'next/link';
import styled from 'styled-components';

export const AccordionWrapper = styled.div`
    position: relative;
    cursor: pointer;
    width: 250px;
    * {
        font-size: 0.9rem;
    }
`;

export const AccordionHeading = styled.button`
    width: 100% !important;
    display: flex;
    cursor: pointer;
    align-items: center;
    padding: 1rem;
    background-color: transparent;
    border: none;

    svg {
        margin-right: 0.5rem;
    }

    h1 {
        width: 100%;
        text-align: left;
        text-transform: capitalize;
    }
`;

export const AccordionContent = styled.div`
    padding-left: 1rem;
    /* height: 0; */
    /* opacity: 0; */
    /* visibility: hidden; */
    transition: height 0.3s ease-in-out;

    svg {
        margin-right: 0.5rem;
    }

    &.animated {
        opacity: 1;
        visibility: visible;
        margin-bottom: ${(props) => `${props?.targetHeight} + 1rem`};
        transition: height 0.3s ease-in-out, opacity 0.3s 0.1s ease-in-out;
    }
`;

export const FolderItem = styled.button`
    color: ${(props) => props?.theme?.text};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100% !important;
    padding: 0.8rem;
    margin-bottom: 0.2rem;
    border: none;
    border-radius: 5px;
    transition: 0.3s all ease-in-out;
    background-color: transparent;

    &.active {
        background-color: ${(props) => props?.theme?.primary?.light};
    }

    .link_wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .folder_details {
            display: flex;
            align-items: center;
            margin-right: 1rem;
        }

        span {
            color: ${(props) => props?.theme?.primary?.dark};
        }
    }

    &:hover {
        cursor: pointer;
        background-color: ${(props) => props?.theme?.background?.dark};
    }
`;
