import React, { FC } from 'react';
//@ts-ignore
import airportIcon from './airports.svg';
//@ts-ignore
import fplIcon from './flightPlan.svg';
//@ts-ignore
import homeIcon from './home.svg';
//@ts-ignore
import wnbIcon from './WnB.svg';
//they exist fuck off
type T_IconProps = {
	width: number;
};

export const AirportsIcon: FC<T_IconProps> = (
	props: T_IconProps
): JSX.Element => {
	return (
		<div>
			<img
				style={{ width: `${props.width}px` }}
				src={airportIcon}
				alt="airports"
			/>
		</div>
	);
};
