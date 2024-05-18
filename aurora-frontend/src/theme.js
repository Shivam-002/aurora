import { createTheme } from "@material-ui/core";


const theme = createTheme({
    palette : {
        primary: {
            light: '#e0e0e0',
            main: '#7b7b7b',
            dark: '#121212',
            hover: '#b8b8b8',
            logo: '#b074ff',
        },
        secondary: {
            light: '#e0e0e0',
            main: '#e0e0e0',
            dark: '#e0e0e0',
        },
        text: {
            primary: '#e3e3e3',
            secondary: '#ededed',
            focused: '#f2f2f2',
            disabled: '#7b7b7b',
            dim: '#878787',
        },
    },
    typography: {
        fontFamily: 'Playfair, sans-serif',
    },

});

export default theme;