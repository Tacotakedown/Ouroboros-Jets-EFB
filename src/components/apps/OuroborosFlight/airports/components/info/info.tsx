import React, { useState } from 'react'
import { E_FrequencyTypes, getStringFromFreqType } from '../frequencies/enums'
import { Frequencies } from '../frequencies'
import { FrequenciesButton } from '../frequencies/frequenciesButton'
import './info.scss'

type T_InfoProps = {
  data: any
}

export const Info: React.FC<T_InfoProps> = (props: T_InfoProps): JSX.Element => {
  const [frequencyType, setFrequencyType] = useState<E_FrequencyTypes>(E_FrequencyTypes.WEATHER_AND_ADVISORY)
  const updateFrequencyType = (type: E_FrequencyTypes): void => {
    setFrequencyType(type)
  }
  const emergencyFrequency = {
    id: '0',
    airport_ref: '0',
    airport_ident: '0',
    type: 'EMERGENCY',
    description: 'EMERGENCY',
    frequency_mhz: '121.500'
  }

  const getFrequenies = (type: E_FrequencyTypes): JSX.Element[] | JSX.Element => {
    if (type === E_FrequencyTypes.EMERGENCY) {
      return <Frequencies frequency={emergencyFrequency} emergency filter={type} />
    }
    return props.data.freqs.map((freq: any, index: number) => {
      return <Frequencies key={index} frequency={freq} filter={type} />
    })
  }
  return (
    <div className="info-wrapper">
      <div className="info-buttons-wrapper">
        Frequencies
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Weather"
          to={E_FrequencyTypes.WEATHER_AND_ADVISORY}
        />
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Clearance"
          to={E_FrequencyTypes.CLEARANCE_DELIVERY}
        />
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Ground"
          to={E_FrequencyTypes.GROUND_CONTROL}
        />
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Tower"
          to={E_FrequencyTypes.TOWER}
        />
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Common"
          to={E_FrequencyTypes.COMMON}
        />
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Approach/Departure"
          to={E_FrequencyTypes.APPROACH_DEPARTURE}
        />
        <FrequenciesButton
          state={frequencyType}
          setState={updateFrequencyType}
          text="Emergency"
          to={E_FrequencyTypes.EMERGENCY}
        />
      </div>
      <div className="frequency-display">
        <div> {getStringFromFreqType(frequencyType)}</div>
        {getFrequenies(frequencyType)}
      </div>
    </div>
  )
}
