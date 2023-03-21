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
        error: {
            main: red.A400,
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
        }
    }
});

export default theme;
