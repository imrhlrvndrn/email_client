import GlobalStyles from '@/styles/globals';
import { ThemeProvider } from 'styled-components';
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
    background: {
        light: '#ffffff',
        medium: '#fafafa',
        dark: '#f0f0f0',
    },
    primary: {
        medium: '#106BBD',
        light: '#BED4EC',
        dark: '#0D3B5E',
    },
    text: '#222222',
    constants: {
        flagged: '#fffdd9',
        text: {
            white: '#ffffff',
            black: '#222222',
        },
    },
};

const darkTheme = {
    background: {
        light: '#222222',
        medium: '#111111',
        dark: '#333333',
    },
    primary: {
        medium: '#106BBD',
        light: '#0D3B5E',
        dark: '#BED4EC',
    },
    text: '#ffffff',
    constants: {
        flagged: '#e2d409',
        text: {
            white: '#ffffff',
            black: '#222222',
        },
    },
};

export const CustomThemeProvider = ({ children }) => {
    const [themeState, setThemeState] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme: themeState, setTheme: setThemeState }}>
            <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
