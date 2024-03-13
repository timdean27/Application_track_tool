// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === 'light' ? '#FFFEFD' : 'gray.500',
      color: props.colorMode === 'light' ? 'darkgreen' : 'whiteAlpha.900',
    },
  }),
};
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });

const reactRoot = createRoot(document.getElementById('root'));

const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} position="fixed" top="1rem" right="1rem">
      Toggle Theme
    </Button>
  );
};

reactRoot.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ColorModeToggle />
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
