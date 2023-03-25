import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
    spacing: 0,
    palette: {
        primary: {
            main: '#4E1488',
            light: '#8f44b3',
            dark: '#20013F'
        },
        secondary: {
            main: '#33A16A',
            light: '#1cba4f',
            dark: '#2A8457'
        },
        text: {
            primary: '#20013F'
        },
        error: {
            main: '#ff0000'
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiToolbar: {
            styleOverrides: {
                dense: {
                    height: 50,
                    minHeight: 50,
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '15px',
                    backgroundColor: '#594969',
                    color: '#fdfcff',
                    margin: '0'
                },
                arrow: {
                    color: '#594969'
                }
            }
        },
        'MuiPopover-paper': {
            backgroundColor: '#e9e2ef',
            color: '#20013F',
            borderRadius: '5%',
            padding: '10px'
        }
    },
    shape: {
        borderRadius: 10
    }
});

export default theme;
