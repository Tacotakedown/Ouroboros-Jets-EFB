import React from 'react'
import { AppDock } from '../AppDock/AppDock'
import './Home.scss'
import { AppIcon } from '../AppIcon/AppIcon'
import { AirportsIcon } from '../../common/icons/Icons'

export const OsHome = (): JSX.Element => {
  return (
    <div className="home-container">
      <div className="home-grid">
        <AppIcon showText icon={<AirportsIcon width={50} />} text="OBJ Flight" to={1} />
        <AppIcon showText icon={<AirportsIcon width={50} />} text="Chrome" to={2} />
        <AppIcon showText icon={<AirportsIcon width={50} />} text="Configurator" to={3} />
      </div>
      <AppDock />
    </div>
  )
}
