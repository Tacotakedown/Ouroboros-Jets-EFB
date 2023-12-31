import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../appRouter/appRouter'
import { type ApiReturnType } from './airportApiData'
import { ApiReturn } from './airportApiData'
import { Info } from './components/info/info'
import { InfoButtonBar } from './components/infoButtonBar/infoButtonBarButton'
import { AirportsHeader } from './components/AirportsHeader/AirportsHeader'
import { AirportsFavorites } from './components/FavoriteAirports/FavoriteAirports'
import { AirportDisplay } from './components/AirportsDisplay/AirportsDisplay'
import { Weather } from './components/weather/weather'
import { Runway } from './components/runway/runway'
import { Procedure } from './components/procedure/procedure'
import { type IMetar, parseMetar, parseTAF, type ITAF } from 'metar-taf-parser'
import { getFlightCategory } from '../common/getFlightCategory'
import { Notams } from './components/notams/notams'
import {
  weatherUrlBuilder,
  type T_WeatherReturnTypeMetar,
  type T_WeatherReturnTypeTaf,
  E_WeatherTypes,
  sampleMetar,
  sampleTaf,
  T_StationReturnType,
  sampleStation,
  stationUrlBuilder
} from './avwxApi'
import { Settings } from './components/SettingsMenu/Settings'

type T_AirportsProps = {
  children?: JSX.Element
}

export const Airports: React.FC<T_AirportsProps> = (props: T_AirportsProps): JSX.Element => {
  const [parsedMetar, setParsedMetar] = React.useState<IMetar>()
  const [parsedTaf, setParsedTaf] = React.useState<ITAF>()
  const { state, updateState } = useContext(AppContext)
  const [airportsState, setAirportsState] = useState<number>(0)
  const [stationInfo, setStationInfo] = useState<T_StationReturnType>(sampleStation)
  const [data, setData] = useState<ApiReturnType>(ApiReturn)
  const [airport, setAirport] = useState<string>(state?.ouroborosFlight.currentAirport ?? '')
  const [metar, setMetar] = React.useState<T_WeatherReturnTypeMetar>(sampleMetar)
  const [taf, setTaf] = React.useState<T_WeatherReturnTypeTaf>(sampleTaf)
  const [settingsShow, setSettingsShow] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchMetar = async (): Promise<void> => {
      try {
        if (state?.ouroborosFlight.currentAirport === undefined) return

        const response = await fetch(weatherUrlBuilder(E_WeatherTypes.METAR, state.ouroborosFlight.currentAirport))
        const json = await response.json()

        setMetar(json)
      } catch (e) {
        console.error(e)
      }
    }
    const fetchTaf = async (): Promise<void> => {
      try {
        if (state?.ouroborosFlight.currentAirport === undefined) return

        const response = await fetch(weatherUrlBuilder(E_WeatherTypes.TAF, state.ouroborosFlight.currentAirport))
        const json = await response.json()

        setTaf(json)
      } catch (e) {
        console.error(e)
      }
    }
    const fetchStation = async (): Promise<void> => {
      try {
        if (state?.ouroborosFlight.currentAirport === undefined) return

        const response = await fetch(stationUrlBuilder(state.ouroborosFlight.currentAirport))
        const json = await response.json()
        setStationInfo(json)
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
    fetchStation().catch((e) => {
      console.error(e)
    })
  }, [state?.ouroborosFlight.currentAirport])

  useEffect(() => {
    console.log(stationInfo)
  }, [stationInfo])

  const apiToken = process.env.AIRPORT_API_KEY
  const changeAirport = (airport: string): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: airport,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: state?.ouroborosFlight.darkMode,
          scratchpads: state?.ouroborosFlight.scratchpads
        }
      }
    })
  }
  const addFavorite = (airport: string): void => {
    const favorites = state?.ouroborosFlight.favorites ?? []
    favorites.push(airport)
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: favorites,
          darkMode: state?.ouroborosFlight.darkMode,
          scratchpads: state?.ouroborosFlight.scratchpads
        }
      }
    })
  }
  const removeStringFromArray = (array: string[], string: string): string[] => {
    const newArray = array.filter((item) => item !== string)
    return newArray
  }

  const removeFavorite = (airport: string): void => {
    const favorites = state?.ouroborosFlight.favorites ?? []
    const newFavorites = removeStringFromArray(favorites, airport)
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: newFavorites,
          darkMode: state?.ouroborosFlight.darkMode,
          scratchpads: state?.ouroborosFlight.scratchpads
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

  React.useEffect(() => {
    if (metar.raw === undefined || metar.raw === null) return
    if (metar.raw === '') return
    setParsedMetar(parseMetar(metar.raw))
  }, [metar.raw])

  React.useEffect(() => {
    if (taf.raw === undefined || taf.raw === null) return
    if (taf.raw === '') return
    setParsedTaf(parseTAF(taf.raw))
  }, [taf.raw])

  const flightCategory = getFlightCategory(
    {
      type: parsedMetar?.clouds[parsedMetar.clouds.length - 1]?.quantity ?? '',
      height: parsedMetar?.clouds[parsedMetar.clouds.length - 1]?.height ?? 0
    },
    parsedMetar?.visibility?.value ?? 999
  )

  const getPage = (): JSX.Element => {
    switch (airportsState) {
      case 0:
        return <Info data={data} />
      case 1:
        return (
          <Weather
            airport={data?.ident ?? ''}
            source={'AWC'}
            metar={metar}
            taf={taf}
            parsedMetar={parsedMetar}
            parsedTaf={parsedTaf}
            fieldElev={stationInfo.elevation_ft}
          />
        )
      case 2:
        return (
          <Runway
            runways={stationInfo.runways}
            wind={{ direction: parsedMetar?.wind?.degrees ?? 0, velocity: parsedMetar?.wind?.speed ?? 0 }}
            airport={data?.ident ?? ''}
          />
        )
      case 3:
        return <Procedure airport={data?.ident ?? ''} />
      case 4:
        return <Notams airport={data?.ident ?? ''} />
      default:
        return <div></div>
    }
  }

  return (
    <div>
      <AirportsHeader
        settingsButtonCallback={setSettingsShow}
        setAirport={setAirport}
        airport={airport}
        changeAirport={changeAirport}
      />

      <Settings open={settingsShow} forceClose={setSettingsShow} />
      <InfoButtonBar state={airportsState} setState={setAirportsState} />
      <AirportsFavorites setAirport={changeAirport} favorites={state?.ouroborosFlight.favorites ?? []} />
      <AirportDisplay
        city={stationInfo.city}
        country={stationInfo.country}
        coordnates={{ lon: stationInfo.longitude, lat: stationInfo.latitude }}
        metarRaw={metar.raw ?? ''}
        removeFavorite={removeFavorite}
        favorites={state?.ouroborosFlight.favorites ?? []}
        addFavorite={addFavorite}
        airport={data?.ident ?? ''}
        fieldElevation={stationInfo.elevation_ft}
        flightCategory={flightCategory}
        name={stationInfo.name}
      />
      {getPage()}
    </div>
  )
}
