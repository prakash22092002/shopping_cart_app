import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


const ProductTable = lazy(() => import('./pages/ProductTable'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));


const App = () => (
  <Router>
    <Suspense fallback={<CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}>
      <Routes>
        <Route path='/' element={<ProductTable />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </Suspense>
  </Router>
);


export default App;