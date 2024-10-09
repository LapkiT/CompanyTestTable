import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Loading } from '@/widgets/Loading/Loading';
import { AppRouter } from '@/routes/AppRouter';
import { store } from '@/store';
import './App.module.scss';

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <AppRouter />
            </Suspense>
        </BrowserRouter>
    </Provider>
);
