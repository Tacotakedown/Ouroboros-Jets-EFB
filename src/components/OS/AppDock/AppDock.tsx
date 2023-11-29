import React from 'react'
import { AppIcon } from '../AppIcon/AppIcon'
import { AirportsIcon } from '../../common/icons/Icons'

export const AppDock = (): JSX.Element => {
  return (
    <div>
      <div>
        <AppIcon icon={<AirportsIcon width={50} />} text="ForeFlight" to={1} />
        <AppIcon icon={<AirportsIcon width={50} />} text="Chrome" to={2} />
      </div>
    </div>
  )
}
