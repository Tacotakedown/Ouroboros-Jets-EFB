import React from 'react'
import './frequencies.scss'
import { E_FrequencyTypes } from './enums'

type T_FrequenciesProps = {
  frequency: {
    id: string | undefined
    airport_ref: string | undefined
    airport_ident: string | undefined
    type: string | undefined
    description: string | undefined
    frequency_mhz: string | undefined
  }
  emergency?: boolean
  filter: E_FrequencyTypes
}
// we will filter the frequencies with the filter prop passed from the parent component
export const Frequencies: React.FC<T_FrequenciesProps> = (props: T_FrequenciesProps): JSX.Element => {
  let content = <></>
  switch (props.filter) {
    case E_FrequencyTypes.GROUND_CONTROL:
      if (props.frequency.type === 'GND') {
        content = (
          <div>
            <div className="frequency-type-box">
              <div className="frequency-box">
                <div>{props.frequency.description}</div>
                <div>{props.frequency.frequency_mhz}</div>
              </div>
            </div>
          </div>
        )
      }
      break
    case E_FrequencyTypes.TOWER:
      if (props.frequency.type === 'TWR') {
        content = (
          <div>
            <div className="frequency-type-box">
              <div className="frequency-box">
                <div>{props.frequency.description}</div>
                <div>{props.frequency.frequency_mhz}</div>
              </div>
            </div>
          </div>
        )
      }
      break
    case E_FrequencyTypes.WEATHER_AND_ADVISORY:
      if (props.frequency.type === 'ATIS' || props.frequency.type === 'AWOS' || props.frequency.type === 'ASOS') {
        content = (
          <div>
            <div className="frequency-type-box">
              <div className="frequency-box">
                <div>{props.frequency.description}</div>
                <div>{props.frequency.frequency_mhz}</div>
              </div>
            </div>
          </div>
        )
      }
      break
    case E_FrequencyTypes.APPROACH_DEPARTURE:
      if (props.frequency.type === 'A/D') {
        content = (
          <div>
            <div className="frequency-type-box">
              <div className="frequency-box">
                <div>{props.frequency.description}</div>
                <div>{props.frequency.frequency_mhz}</div>
              </div>
            </div>
          </div>
        )
      }
      break
    case E_FrequencyTypes.EMERGENCY:
      if (props.emergency === undefined) return <></>
      if (props.emergency) {
        content = (
          <div>
            <div className="frequency-type-box">
              <div className="frequency-box">
                <div>Gaurd</div>
                <div>121.500</div>
              </div>
            </div>
          </div>
        )
      }

      break
    case E_FrequencyTypes.CLEARANCE_DELIVERY:
      if (props.frequency.type === 'CLD') {
        content = (
          <div>
            <div className="frequency-type-box">
              <div className="frequency-box">
                <div>{props.frequency.frequency_mhz}</div>

                <div>{props.frequency.description}</div>
              </div>
            </div>
          </div>
        )
      }
      break
  }

  return <div>{content}</div>
}
