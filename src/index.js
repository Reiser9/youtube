import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createTheme, ThemeProvider, responsiveFontSizes} from '@mui/material/styles';

let theme = createTheme({
    spacing: 10,
    components: {
        MuiTextField: {
          styleOverrides: {
                root: {
                    fontSize: 18
                }
            }
        }
    }
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);