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
            main: '#5a1d96',
            light: '#bb95ce',
            dark: '#360c61'
        },
        secondary: {
            main: '#33A16A',
            light: '#5eb88b',
            dark: '#2A8457'
        },
        text: {
            primary: '#20013F'
        },
        error: {
            main: '#ff0000'
        },
        grey: {
            main: '#807d82',
            dark: '#635e66',
            light: '#aba6ad'
        },
        purpleGrey: {
            dark: '#534660'
        },
        lightPurpleGrey: {
            main: '#eeeaf2',
            dark: '#bfb2cc',
            light: '#f8f6fa'
        },
        lightGreen: {
            main: '#9bd4b7',
            light: '#e4ede8'
        },
        red: {
            main: '#aa3d3d',
            dark: '#942b2b',
            light: '#c75858'
        },
        codeEditor: {
            main: '#2A173D',
            dark: '#011627'
        },
        successAlert: {
            main: '#bae0cd',
            dark: '#084225',
        },
        warningAlert: {
            main: '#ebdcbe',
            dark: '#2b1f07'
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    shape: {
        borderRadius: 12
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
                    fontSize: '16px',
                    backgroundColor: '#412d54',
                    color: '#fdfcff',
                    margin: '0'
                },
                arrow: {
                    color: '#412d54'
                }
            }
        },
        'MuiPopover-paper': {
            backgroundColor: '#e9e2ef',
            color: '#20013F',
            borderRadius: '5%',
            padding: '10px'
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ebe6ef',
                    color: '#20013F',
                    padding: '5px'
                }
            }

        }
    },
});

export default theme;
