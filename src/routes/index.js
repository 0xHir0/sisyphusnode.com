import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DAppProvider } from '@usedapp/core';

const HomePage = lazy(() => import('../pages/home'));
const ErrorPage = lazy(() => import('../pages/error'));

const AppRoutes = () => {
  return (
    <DAppProvider config={{}}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route component={ErrorPage} />
      </Routes>
    </DAppProvider>
  );
};

export default AppRoutes;
