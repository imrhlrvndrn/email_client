const { default: styled } = require('styled-components');

export const ToolbarWrapper = styled.div`
    width: 99%;
    margin: 0.5rem auto;
    padding: 0.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 0;
    box-shadow: 0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);
    background-color: ${(props) => props?.theme?.background?.light};
`;
