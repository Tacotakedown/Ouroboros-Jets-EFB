import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appRouter/appRouter';
import { ApiReturn, apiReturnType } from './airportApiData';

export const Airports = () => {
	const { state, updateState } = useContext(AppContext);
	const [data, setData] = useState<apiReturnType>(ApiReturn);
	const apiToken = process.env.AIRPORT_API_KEY;
	const changeAirport = (airport: string): void => {
		updateState({
			...state,
			state: {
				ouroborosFlight: {
					page: state?.ouroborosFlight.page,
					currentChart: state?.ouroborosFlight.currentChart,
					currentAirport: airport,
				},
			},
		});
	};
	const urlBulder = (ICAO: string, Token: any): string => {
		const Url = `https://airportdb.io/api/v1/airport/${ICAO}?apiToken=${Token}`;
		return Url;
	};
	useEffect(() => {
		if (state?.ouroborosFlight.currentAirport === undefined) return;
		fetch(urlBulder(state.ouroborosFlight.currentAirport, apiToken))
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((e) => console.log(e));
	}, [state?.ouroborosFlight.currentAirport]);

	return (
		<div>
			<div onClick={() => changeAirport('KPHX')}>
				{JSON.stringify(data)}
				{state?.ouroborosFlight.currentAirport === undefined
					? 'please select and airport'
					: `selected airport :${state.ouroborosFlight.currentAirport}`}
			</div>
		</div>
	);
};
