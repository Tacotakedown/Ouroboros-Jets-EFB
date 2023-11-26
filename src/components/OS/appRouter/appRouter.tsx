/**
 * allow for shared state across apps, we will share them in a context as an object
 */

import React, { useContext, createContext, useState } from 'react';
import { T_AppContextType, defaultAppContextValues } from './appContextType';

//the implicit any needs to go back to a type eventually (prob not but doesnt look clean)
export const AppContext = createContext<any>(defaultAppContextValues);

type T_AppRouterProps = {
	children: JSX.Element;
};

export const AppRouter: React.FC<T_AppRouterProps> = (
	props: T_AppRouterProps
): JSX.Element => {
	const [appState, setAppState] = useState<T_AppContextType>(
		defaultAppContextValues
	);

	return (
		<AppContext.Provider value={{ appState, setAppState }}>
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
