import React from 'react';
import { ButtonBarButton } from './button';
import './buttonBar.scss';

export const ButtonBar = (): JSX.Element => {
	return (
		<div className="button-bar">
			<ButtonBarButton text="Home" to={0} />
			<ButtonBarButton text="Airports" to={1} />
			<ButtonBarButton text="Flight Plan" to={2} />
			<ButtonBarButton text="Weight/Balance" to={3} />
			<ButtonBarButton text="Browser" to={4} />
			<ButtonBarButton text="Checklists" to={5} />
			<ButtonBarButton text="Weather" to={6} />
			<ButtonBarButton text="Scratchpad" to={7} />
		</div>
	);
};
