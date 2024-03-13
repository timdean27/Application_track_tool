import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext: React.FC<ThemeContextProps> = ({ children }) => {
  return (
    <Flex>
      <Box flex={1} w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }} boxShadow="2xl">
        {children}
      </Box>
    </Flex>
  );
};

export default ThemeContext;
