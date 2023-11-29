import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../appRouter/appRouter'
import { type ApiReturnType } from './airportApiData'
import { ApiReturn } from './airportApiData'

type T_AirportsProps = {
  children?: JSX.Element
}

export const Airports: React.FC<T_AirportsProps> = (
  props: T_AirportsProps
): JSX.Element => {
  const { state, updateState } = useContext(AppContext)
  const [data, setData] = useState<ApiReturnType>(ApiReturn)
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

        const response = await fetch(
          urlBulder(state.ouroborosFlight.currentAirport)
        )
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

  return (
    <div>
      <div
        onClick={() => {
          changeAirport('KPHX')
        }}
      >
        {JSON.stringify(data)}
        {state?.ouroborosFlight.currentAirport === undefined
          ? 'please select and airport'
          : `selected airport :${state.ouroborosFlight.currentAirport}`}
      </div>
    </div>
  )
}
