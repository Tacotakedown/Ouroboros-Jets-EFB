import React from 'react';
import { ButtonBarButton } from './button';
import './buttonBar.scss';

type T_ButtonBarProps = {
	recentButton: {
		text: string;
		to: number;
		icon?: JSX.Element;
	};
};
export const ButtonBar: React.FC<T_ButtonBarProps> = (
	props: T_ButtonBarProps
): JSX.Element => {
	return (
		<div className="button-bar">
			<ButtonBarButton text="Airports" to={0} />
			<ButtonBarButton text="Maps" to={1} />
			<ButtonBarButton text="Plates" to={2} />
			{/* <ButtonBarButton text="Documents" to={3} /> */}
			<ButtonBarButton text="Imagery" to={3} />
			<ButtonBarButton text="ScratchPads" to={4} />
			<ButtonBarButton text="Checklists" to={5} />
			<ButtonBarButton text="W & B" to={6} />
		</div>
	);
};
