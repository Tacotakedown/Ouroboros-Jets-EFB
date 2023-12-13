import React from 'react'
import './weather.scss'
import {
  weatherUrlBuilder,
  type T_WeatherReturnTypeMetar,
  type T_WeatherReturnTypeTaf,
  E_WeatherTypes,
  sampleMetar,
  sampleTaf
} from '../../avwxApi'

type T_WeatherProps = {
  airport: string
  source: 'AWC' | 'VATSIM' | 'NONE'
}

export const Weather: React.FC<T_WeatherProps> = (props: T_WeatherProps): JSX.Element => {
  const [metar, setMetar] = React.useState<T_WeatherReturnTypeMetar>(sampleMetar)
  const [taf, setTaf] = React.useState<T_WeatherReturnTypeTaf>(sampleTaf)
  React.useEffect(() => {
    const fetchMetar = async (): Promise<void> => {
      try {
        if (props.airport === undefined) return

        const response = await fetch(weatherUrlBuilder(E_WeatherTypes.METAR, props.airport))
        const json = await response.json()

        setMetar(json)
      } catch (e) {
        console.error(e)
      }
    }
    const fetchTaf = async (): Promise<void> => {
      try {
        if (props.airport === undefined) return

        const response = await fetch(weatherUrlBuilder(E_WeatherTypes.TAF, props.airport))
        const json = await response.json()

        setTaf(json)
      } catch (e) {
        console.error(e)
      }
    }
    fetchMetar().catch((e) => {
      console.error(e)
    })
    fetchTaf().catch((e) => {
      console.error(e)
    })
  }, [props.airport])
  return (
    <div className="weather-wrapper">
      <h1>Weather</h1>
      <p>{metar.raw}</p>
      <p>{taf.raw}</p>
    </div>
  )
}
