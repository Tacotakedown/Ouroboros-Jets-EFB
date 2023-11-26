import React from 'react';
import { OsHome } from '../Home/Home';
import { AppRouter } from '../appRouter/appRouter';
import {
	LoadContext,
	UseNaigate,
	OsRouterContext,
} from '../../../hooks/OsRouter';

export const DisplayProvider = () => {
	const OSContext = LoadContext(OsRouterContext);
	const OsAppSwitch = (): JSX.Element => {
		switch (OSContext.page) {
			case 0:
				return <OsHome />;
			case 1:
				return <div>ForeFlight</div>;
			case 2:
				return <div>Chrome</div>;
			default:
				return <OsHome />;
		}
	};
	const handleClick = (to: number): void => {
		UseNaigate(OSContext, to);
	};
	return (
		<div>
			<AppRouter>
				<div>{OsAppSwitch()}</div>
			</AppRouter>
		</div>
	);
};
