// App.tsx
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/Homepage';

import ThemeContext from './Theme/ThemeContext';
import axios from 'axios';

function App() {

  return (
    <ThemeContext>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </ThemeContext>
  );
}

export default App;
