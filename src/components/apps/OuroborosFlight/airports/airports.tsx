import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../appRouter/appRouter'
import { type ApiReturnType } from './airportApiData'
import { ApiReturn } from './airportApiData'
import { Frequencies } from './components/frequencies'

type T_AirportsProps = {
  children?: JSX.Element
}

export const Airports: React.FC<T_AirportsProps> = (props: T_AirportsProps): JSX.Element => {
  const { state, updateState } = useContext(AppContext)
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

  const getFrequenies = (): JSX.Element[] => {
    return data.freqs.map((freq, index) => {
      return <Frequencies key={index} frequency={freq} />
    })
  }

  return (
    <div>
      <div
        style={{ color: 'red' }}
        onClick={() => {
          changeAirport(airport)
        }}
      >
        Click Here to Search (TEMP)
      </div>
      <form>
        <label>
          Enter your Airport:
          <input
            type="text"
            style={{ fontSize: '30px' }}
            value={airport}
            onChange={(e) => {
              setAirport(e.target.value)
            }}
          />
        </label>
      </form>
      {getFrequenies()}
    </div>
  )
}
