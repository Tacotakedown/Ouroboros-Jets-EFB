/**
 * we will generate a bootleg home button to work with browser while debugging
 */
import React from 'react';
import './HomeButton.scss';
import {
	LoadContext,
	OsRouterContext,
	UseNaigate,
} from '../../../hooks/OsRouter';

export const HomeButton = () => {
	const OSRouter = LoadContext(OsRouterContext);
	return (
		<div
			className="home-button-debug"
			onClick={() => UseNaigate(OSRouter, 0)}
			onDoubleClick={() => console.log('app selector menu fired')}
		>
			<div>HOME</div>
		</div>
	);
};
