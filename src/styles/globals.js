import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 400; 
  box-sizing: border-box;
  text-decoration: none;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props?.theme?.text};
}

body{
  background-color: ${(props) => props?.theme?.background?.medium};
  height: 100vh;
}
`;
