import React from 'react'
import { AppIcon } from '../AppIcon/AppIcon'
import { AirportsIcon } from '../../common/icons/Icons'
import './AppDock.scss'

export const AppDock = (): JSX.Element => {
  return (
    <div className="app-dock-positioner">
      <div className="app-dock-container">
        <AppIcon icon={<AirportsIcon width={50} />} text="OBJ Flight" to={1} />
        <AppIcon icon={<AirportsIcon width={50} />} text="Chrome" to={2} />
        <AppIcon icon={<AirportsIcon width={50} />} text="Configurator" to={3} />
      </div>
    </div>
  )
}
