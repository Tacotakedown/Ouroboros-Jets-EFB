import React, { FC } from 'react';
import {
	LoadContext,
	OsRouterContext,
	UseNaigate,
} from '../../../../hooks/OsRouter';
import { useSpring, animated, config } from 'react-spring';
import './button.scss';

type T_ButtonBarButtonProps = {
	text: string;
	to: number;
	icon?: React.ReactElement;
};

const Buttons = [
	'M 5 0 L 190 0 Q 194 1, 195 5 L 195 140 Q 194 144, 190 145 L 148 145 L 99 145 Q 97 145, 95 145 L 47 145 L 5 145 Q 1 144, 0 140 L 0 5 Q 1 1, 5 0',
	'M 5 0 L 190 0 Q 194 1, 195 5 L 195 140 Q 194 144, 190 145 L 148 145 L 99 175 Q 97 176, 95 175 L 47 145 L 5 145 Q 1 144, 0 140 L 0 5 Q 1 1, 5 0',
];

export const ButtonBarButton: FC<T_ButtonBarButtonProps> = (
	props: T_ButtonBarButtonProps
): JSX.Element => {
	const router = LoadContext(OsRouterContext);

	const isActive = (): boolean => {
		if (props.to === router.page) return true;
		else return false;
	};

	const handleClick = (to: number): void => {
		UseNaigate(router, to);
	};

	const { x } = useSpring({
		config: { duration: 100 },
		x: isActive() ? 1 : 0,
	});

	return (
		<div
			onClick={() => handleClick(props.to)}
			className={`${isActive() ? 'active' : 'normal'} button`}
		>
			<svg
				width="200"
				height="200"
				viewBox="0 0 200 200"
				fill="#ffffff36"
				xmlns="https://www.w3.org/2000/svg"
			>
				<g transform="scale(1.05) translate(-4,0)">
					<animated.path
						d={x.to({
							range: [0, 1],
							output: Buttons,
						})}
						fill={'#2a2fff'}
					/>
				</g>

				<animated.path
					d={x.to({
						range: [0, 1],
						output: Buttons,
					})}
					fill={'#007eff'}
				/>
			</svg>
			<div className="button-contents">
				{props.icon}
				{props.text}
			</div>
		</div>
	);
};
