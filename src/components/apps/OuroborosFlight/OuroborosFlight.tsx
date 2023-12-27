import React, { useState } from 'react'
import { ButtonBar } from './buttonBar/buttonBar'
import { AppContext } from '../appRouter/appRouter'
import './OuroborosFlight.scss'
import { Airports } from './airports/airports'
import { NgMap } from '../../../NavigraphApi/Map'

export const OuroborosFlight = (): JSX.Element => {
  const { state } = React.useContext(AppContext)

  const HandlePage = (): JSX.Element => {
    switch (state?.ouroborosFlight.page) {
      case 0:
        return <Airports />
      case 1:
        return <NgMap />
      case 2:
        return <div>plates</div>
      case 3:
        return <div>Imagery</div>
      case 4:
        return <div>scratchpads</div>
      case 5:
        return <div>Checklists</div>
      case 6:
        return <div>weight & balance</div>

      default:
        return <></>
    }
  }

  const [loading] = useState(false)

  return loading ? (
    <div className={`ouroboros-flight-root`}>Loading...</div>
  ) : (
    <div className={`ouroboros-flight-root`}>
      <div className="ouroboros-flight-container">{HandlePage()}</div>
      <div></div>
      <ButtonBar recentButton={{ to: 8, text: '' }} />
    </div>
  )
}
