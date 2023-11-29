import React, { type FC } from 'react'

import airportIcon from './airports.svg'

// import fplIcon from './flightPlan.svg'

// import homeIcon from './home.svg'

// import wnbIcon from './WnB.svg'

type T_IconProps = {
  width: number
}

export const AirportsIcon: FC<T_IconProps> = (
  props: T_IconProps
): JSX.Element => {
  return (
    <div>
      <img
        style={{ width: `${props.width}px` }}
        src={airportIcon}
        alt="airports"
      />
    </div>
  )
}
