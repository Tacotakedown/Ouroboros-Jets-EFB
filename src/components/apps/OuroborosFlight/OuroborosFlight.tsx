import React, { useEffect, useState } from 'react'
import { ButtonBar } from './buttonBar/buttonBar'
import { AppContext } from '../appRouter/appRouter'
import './OuroborosFlight.scss'
import watermark from './WATERMARK.png'
import { Airports } from './airports/airports'
import { NgMap } from '../../../NavigraphApi/Map'
import { Scratchpads } from './Scratchpads/Scratchpads'
import { GroundService } from './GroundService/GroundService'

export const OuroborosFlight = (): JSX.Element => {
  const { state } = React.useContext(AppContext)

  const HandlePage = (): JSX.Element => {
    switch (state?.ouroborosFlight.page) {
      case 0:
        return <Airports />
      // case 1:
      //   return <NgMap />
      // case 2:
      //   return <div>plates</div>
      // case 3:
      //   return <div>Imagery</div>
      case 4:
        return <Scratchpads />
      case 5:
        return <div>Checklists</div>
      case 6:
        return <div>weight & balance</div>
      case 7:
        return <GroundService />
      case 8:
        return <div>Flight Plan</div>
      case 9:
        return <div>Cabin Config</div>

      default:
        return <></>
    }
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDelay = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(loadDelay)
  })

  return loading ? (
    <div className={`ouroboros-flight-root loading-container`}>
      <img className="loading-watermark" src={watermark} alt="Loading..." />
    </div>
  ) : (
    <div className={`ouroboros-flight-root`}>
      <div className="ouroboros-flight-container">{HandlePage()}</div>
      <div></div>
      <ButtonBar recentButton={{ to: 8, text: '' }} />
    </div>
  )
}
