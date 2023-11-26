import React, { useState, createContext, useContext } from 'react';
/**
 * i will not let node modules win! i have no life
 */

export const OsRouterContext = createContext<any>(0);
type T_EFBRouterProps = {
	children: JSX.Element;
};
export const EFBRouter: React.FC<T_EFBRouterProps> = (
	props: T_EFBRouterProps
): JSX.Element => {
	const [page, setPage] = useState(0);

	return (
		<OsRouterContext.Provider value={{ page, setPage }}>
			{props.children}
		</OsRouterContext.Provider>
	);
};
export const LoadContext = (
	context: React.Context<any>
): { page: any; setPage: any } => {
	const { page, setPage } = useContext(OsRouterContext);
	return { page: page, setPage: setPage };
};
export const UseNaigate = (
	context: { page: any; setPage: any },
	to: number
): void => {
	if (context.page === to) return;
	context.setPage(to);
};
export const UseCurrentPage = (context: React.Context<any>): number => {
	const { page, setPage } = useContext(context);
	return page;
};
//idk how i feel about this here
export const OsAppRouter = (page: number): JSX.Element => {
	switch (page) {
		case 0:
			return <div>page 0</div>;
		case 1:
			return <div>page 1</div>;
		default:
			return <div>404</div>;
	}
};
