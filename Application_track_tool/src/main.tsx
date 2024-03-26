import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';
import App from './App';

// Define your Material-UI theme
const theme = createTheme({
  palette: {
    mode: 'light', // Set the initial color mode
    background: {
      default: '#FFFEFD', // Light mode background color
      paper: '#FFFFFF', // Light mode paper color
    },
    primary: {
      main: '#006400', // Dark green color
    },
  },
});

const reactRoot = createRoot(document.getElementById('root'));

const ColorModeToggle = () => {
  // You can implement your own color mode toggle logic if needed
  return null;
};

reactRoot.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply Material-UI's baseline styles */}
      <ColorModeToggle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
