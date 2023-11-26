import React, { FC } from 'react';
import {
	OsRouterContext,
	UseNaigate,
	LoadContext,
} from '../../../hooks/OsRouter';
import './AppIcon.scss';

type T_AppIconProps = {
	icon: JSX.Element;
	text: string;
	to: number;
};

export const AppIcon: FC<T_AppIconProps> = (
	props: T_AppIconProps
): JSX.Element => {
	const OSContext = LoadContext(OsRouterContext);

	return (
		<div
			onClick={() => UseNaigate(OSContext, props.to)}
			className="app-icon-wrapper"
		>
			<div className="app-icon-image-container">{props.icon}</div>
			<div className="app-icon-text">{props.text}</div>
		</div>
	);
};
