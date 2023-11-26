import React from 'react';
import './index.scss';
import { Render } from './hooks/render';
import { EFBRouter } from './hooks/OsRouter';
import { DisplayProvider } from './components/OS/DisplayProvider/DisplayProvider';
import { HomeButton } from './components/OS/HomeButton/HomeButton';

const EFB = () => {
	return (
		<EFBRouter>
			<div className="ipadContainer">
				<DisplayProvider />
				<HomeButton />
			</div>
		</EFBRouter>
	);
};

Render(<EFB />);
