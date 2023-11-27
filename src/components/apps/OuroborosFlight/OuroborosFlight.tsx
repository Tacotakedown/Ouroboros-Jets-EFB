import React, { useEffect, useState, useContext } from 'react';
import { ButtonBar } from './buttonBar/buttonBar';
import { AppContext, LoadAppContext } from '../appRouter/appRouter';
import './OuroborosFlight.scss';
import { Airports } from './airports/airports';

export const OuroborosFlight = () => {
	const { state, updateState } = useContext(AppContext);

	const HandlePage = (): JSX.Element => {
		switch (state?.ouroborosFlight.page) {
			case 0:
				return <Airports />;
			case 1:
				return <div>maps</div>;
			case 2:
				return <div>plates</div>;
			case 3:
				return <div>Imagery</div>;
			case 4:
				return <div>scratchpads</div>;
			case 5:
				return <div>Checklists</div>;
			case 6:
				return <div>weight & balance</div>;

			default:
				return <></>;
		}
	};
	const [appOpen, setAppOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setAppOpen(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => setAppOpen(false);
	}, []);

	return loading ? (
		<div className={`ouroboros-flight-root ${appOpen ? 'open' : 'closed'}`}>
			Loading...
		</div>
	) : (
		<div className={`ouroboros-flight-root ${appOpen ? 'open' : 'closed'}`}>
			<div className="ouroboros-flight-container">{HandlePage()}</div>
			<ButtonBar recentButton={{ to: 8, text: '' }} />
		</div>
	);
};
