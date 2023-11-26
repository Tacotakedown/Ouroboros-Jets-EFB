import React, { useEffect, useState, useContext } from 'react';
import { ButtonBar } from './buttonBar/buttonBar';
import { AppContext, LoadAppContext } from '../appRouter/appRouter';
import './OuroborosFlight.scss';

export const OuroborosFlight = () => {
	const { state, updateState } = useContext(AppContext);
	const clickHandler = (page: number) => {
		updateState({
			state: { ouroborosFlight: { page: page, currentChart: '' } },
		});
	};

	const HandlePage = (): JSX.Element => {
		switch (state?.ouroborosFlight.page) {
			case 0:
				return <div>airports</div>;
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
	useEffect(() => {
		setAppOpen(true);

		return () => setAppOpen(false);
	}, []);

	return (
		<div className={`ouroboros-flight-root ${appOpen ? 'open' : 'closed'}`}>
			<div className="ouroboros-flight-container">{HandlePage()}</div>
			<ButtonBar recentButton={{ to: 8, text: '' }} />
		</div>
	);
};
