export type T_AppContextType = {
	ouroborosFlight: {
		page: number;
		currentChart: string;
	};
};

export const defaultAppContextValues: T_AppContextType = {
	ouroborosFlight: {
		page: 0,
		currentChart: '',
	},
};
