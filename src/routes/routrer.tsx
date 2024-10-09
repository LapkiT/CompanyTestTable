import { ReactNode } from 'react';
import { StartPage } from '@/pages/StatrPage';
import { Error } from '@/pages/Error';

export interface IRoute {
	path: string;
	component: ReactNode;
}

export enum RouteNames {
	HOME = '/CheckProj',
   ERROR = '*'
}

export const publicRoutes: IRoute[] = [
   { path: RouteNames.HOME, component: <StartPage /> },
   { path: RouteNames.ERROR, component: <Error /> },
];
