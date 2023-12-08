import React from 'react'
import './frequencies.scss'

type T_FrequenciesProps = {
  key: number
  frequency: {
    id: string | undefined
    airport_ref: string | undefined
    airport_ident: string | undefined
    type: string | undefined
    description: string | undefined
    frequency_mhz: string | undefined
  }
}

export const Frequencies: React.FC<T_FrequenciesProps> = (props: T_FrequenciesProps): JSX.Element => {
  return (
    <div className="frequency-type-box">
      {props.frequency.type}
      <div className="frequency-box" key={props.key}>
        <div>{props.frequency.frequency_mhz}</div>

        <div>{props.frequency.description}</div>
      </div>
    </div>
  )
}
