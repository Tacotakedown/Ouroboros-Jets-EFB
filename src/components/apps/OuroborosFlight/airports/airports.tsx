import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../appRouter/appRouter'
import { type ApiReturnType } from './airportApiData'
import { ApiReturn } from './airportApiData'
import { Info } from './components/info/info'
import { InfoButtonBar } from './components/infoButtonBar/infoButtonBarButton'
import { AirportsHeader } from './components/AirportsHeader/AirportsHeader'
import { AirportsFavorites } from './components/FavoriteAirports/FavoriteAirports'
import { AirportDisplay } from './components/AirportsDisplay/AirportsDisplay'

type T_AirportsProps = {
  children?: JSX.Element
}

export const Airports: React.FC<T_AirportsProps> = (props: T_AirportsProps): JSX.Element => {
  const { state, updateState } = useContext(AppContext)
  const [airportsState, setAirportsState] = useState<number>(0)
  const [data, setData] = useState<ApiReturnType>(ApiReturn)
  const [airport, setAirport] = useState<string>(state?.ouroborosFlight.currentAirport || '')

  const apiToken = process.env.AIRPORT_API_KEY
  const changeAirport = (airport: string): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: airport
        }
      }
    })
  }

  const urlBulder = (ICAO: string): string => {
    const Url = `https://airportdb.io/api/v1/airport/${ICAO}?apiToken=${apiToken}`
    return Url
  }
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (state?.ouroborosFlight.currentAirport === undefined) return

        const response = await fetch(urlBulder(state.ouroborosFlight.currentAirport))
        const json = await response.json()

        setData(json)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData().catch((e) => {
      console.error(e)
    })
  }, [state?.ouroborosFlight.currentAirport])

  const getPage = (): JSX.Element => {
    switch (airportsState) {
      case 0:
        return <Info data={data} />
      case 1:
        return <div>Weather</div>
      case 2:
        return <div>Runway</div>
      case 3:
        return <div>Procedure</div>
      case 4:
        return <div>NOTAM</div>
      default:
        return <div></div>
    }
  }

  return (
    <div>
      <AirportsHeader setAirport={setAirport} airport={airport} changeAirport={changeAirport} />
      <InfoButtonBar state={airportsState} setState={setAirportsState} />
      <AirportsFavorites favorites={['KIWA', 'KSDL', 'KCHD']} />
      <AirportDisplay airport="KIWA" />
      {getPage()}
    </div>
  )
}
