import React from 'react';
import { Container, Grid } from '@mui/material'; // Import Material-UI components

interface ThemeContextProps {
  children: React.ReactNode;
}

const ThemeContext: React.FC<ThemeContextProps> = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ boxShadow: '2xl' }}>
          {children}
        </Container>
      </Grid>
    </Grid>
  );
};

export default ThemeContext;
