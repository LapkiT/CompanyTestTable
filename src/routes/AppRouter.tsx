import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routrer';

export const AppRouter = memo(() => {
    const renderRoutes = publicRoutes;

    return (
        <Routes>
            {renderRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.component}
                />
            ))}
        </Routes>
    );
});
