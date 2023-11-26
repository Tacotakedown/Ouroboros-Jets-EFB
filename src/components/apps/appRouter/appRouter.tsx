/**
 * allow for shared state across apps, we will share them in a context as an object
 */

import React, { useContext, createContext, useState } from 'react';

type T_AppContextType = {
	ouroborosFlight: {
		page: number;
		currentChart: string;
	};
};

type AppState = {
	state?: T_AppContextType;
	updateState: (newState: Partial<AppState>) => void;
};

const defaultState: AppState = {
	state: {
		ouroborosFlight: { page: 0, currentChart: '' },
	},
	updateState: (newState?: Partial<AppState>) => {},
};

const defaultAppContextValues: T_AppContextType = {
	ouroborosFlight: {
		page: 0,
		currentChart: '',
	},
};

export const AppContext = createContext<AppState>(defaultState);

type T_AppRouterProps = {
	children: JSX.Element;
};

export const AppRouter: React.FC<T_AppRouterProps> = (
	props: T_AppRouterProps
): JSX.Element => {
	const [appState, setAppState] = useState({});
	const updateState = (newState: Partial<AppState>) => {
		setAppState({ ...appState, ...newState });
	};

	return (
		<AppContext.Provider value={{ ...appState, updateState }}>
			{props.children}
		</AppContext.Provider>
	);
};

export const LoadAppContext = (
	context: React.Context<any>
): { loadState: any; setState: any } => {
	const { appState, setAppState } = useContext(context);
	return { loadState: appState, setState: setAppState };
};
