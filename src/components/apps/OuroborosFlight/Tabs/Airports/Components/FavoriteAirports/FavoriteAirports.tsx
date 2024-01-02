import React from 'react'
import './FavoriteAirports.scss'
import { type T_Nearest, calculateDistanceLatLonToNM, nearestUrlBuilder, sampleNearest } from '../avwxApi'

type T_AirportsFavoritesProps = {
  favorites: string[]
  setAirport: (airport: string) => void
}

export const AirportsFavorites: React.FC<T_AirportsFavoritesProps> = (props: T_AirportsFavoritesProps): JSX.Element => {
  const [favoritesNearest, setFavoritesNearest] = React.useState<number>(1)
  const [coordinates] = React.useState<number[]>([40.73061, -73.935242])
  const [minimumRunwayLength, setMinimumRunwayLength] = React.useState<number>(5000)
  const [sortingMethod, setSortingMethod] = React.useState<number>(0) // 0 = distance, 1 = longest runway
  const [nearestAirports, setNearestAirports] = React.useState<T_Nearest>(sampleNearest)
  const getFavorites = (): string[] => {
    if (props.favorites.length > 0) return props.favorites
    else return ['No Airports Favorited']
  }
  const prevCoords = React.useRef<number[]>(coordinates)

  const fetchNearest = async (): Promise<void> => {
    try {
      const response = await fetch(nearestUrlBuilder(coordinates))
      const json = await response.json()

      setNearestAirports(json)
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    const distance: number = calculateDistanceLatLonToNM(prevCoords.current, coordinates)

    const minDistance: number = 10 // Minimum distance to update the cache of nearest airports

    if (Math.abs(distance) > minDistance) {
      fetchNearest().catch((e) => {
        console.error(e)
      })
    }
    prevCoords.current = coordinates
  }, [coordinates])

  React.useEffect(() => {
    fetchNearest().catch((e) => {
      console.error(e)
    })
  }, [])

  const getLongestRunway = (station: any): { longestRunwayLength: number; longestNumberSurface: string } => {
    if (station === null || station === undefined) return { longestRunwayLength: 0, longestNumberSurface: '' }

    let longestRunway = station.runways[0]

    for (let i = 1; i < station.runways.length; i++) {
      if (station.runways[i].length_ft > longestRunway.length_ft) {
        longestRunway = station.runways[i]
      }
    }
    return { longestRunwayLength: longestRunway.length_ft, longestNumberSurface: longestRunway.surface }
  }

  const renderNearest = (): JSX.Element => {
    if (nearestAirports === undefined) return <div></div>

    const sortedAirports = nearestAirports.slice().sort((a, b) => {
      const longestRunwayA = getLongestRunway(a.station)
      const longestRunwayB = getLongestRunway(b.station)

      return longestRunwayB.longestRunwayLength - longestRunwayA.longestRunwayLength
    })
    if (sortingMethod === 0) {
      return (
        <div>
          {nearestAirports.map((airport: any, key: number) => {
            const longestRunway = getLongestRunway(airport.station).longestRunwayLength
            if (longestRunway < minimumRunwayLength) return <div></div>
            if (airport.station.icao === null) return <div></div>
            const distanceFromAirport: number = Math.abs(
              calculateDistanceLatLonToNM([airport.station.latitude, airport.station.longitude], coordinates)
            )
            return (
              <div
                onClick={() => {
                  if (airport.station.icao !== undefined) props.setAirport(airport.station.icao)
                }}
                className="airports-favorites-list-item"
                key={key}
              >
                {airport.station.icao}: {airport.station.name}
                <div>{distanceFromAirport.toFixed(0)} NM</div>
                <div>
                  longest runway: {getLongestRunway(airport.station).longestRunwayLength} ft{' '}
                  {getLongestRunway(airport.station).longestNumberSurface}
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          {sortedAirports.map((airport: any, key: number) => {
            const longestRunway = getLongestRunway(airport.station).longestRunwayLength
            if (longestRunway < minimumRunwayLength) return <div></div>
            if (airport.station.icao === null) return <div key={key}></div>

            return (
              <div
                onClick={() => {
                  if (airport.station.icao !== undefined) props.setAirport(airport.station.icao)
                }}
                className="airports-favorites-list-item"
                key={key}
              >
                {airport.station.icao}
                <div>{airport.station.name}</div>
                <div>
                  {calculateDistanceLatLonToNM(
                    [airport.station.latitude, airport.station.longitude],
                    coordinates
                  ).toFixed(0)}{' '}
                  NM
                </div>{' '}
                <div>
                  Longest runway: {getLongestRunway(airport.station).longestRunwayLength} ft{' '}
                  {getLongestRunway(airport.station).longestNumberSurface}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div className="airports-favorites">
      <div className="airports-favorites-tabs">
        <div
          className={`airports-favorites-tab-button ${
            favoritesNearest === 0 ? 'airports-favorites-tab-button-active' : ''
          }`}
          onClick={() => {
            setFavoritesNearest(0)
          }}
        >
          Favorites
        </div>
        <div
          className={`airports-favorites-tab-button ${
            favoritesNearest === 1 ? 'airports-favorites-tab-button-active' : ''
          }`}
          onClick={() => {
            setFavoritesNearest(1)
          }}
        >
          Nearest
        </div>
      </div>
      {favoritesNearest === 0 ? (
        <div>
          <div className="airports-favorites-title">Favorites</div>
          <div className="airports-favorites-list">
            {getFavorites().map((airport: string, key: number) => {
              return (
                <div
                  style={{ fontStyle: airport === 'No Airports Favorited' ? 'italic' : '' }}
                  onClick={() => {
                    if (airport !== 'No Airports Favorited') {
                      props.setAirport(airport)
                    }
                  }}
                  key={key}
                  className="airports-favorites-list-item"
                >
                  {airport}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="airports-favorites-title">
            <div
              onClick={() => {
                minimumRunwayLength === 5000 ? setMinimumRunwayLength(0) : setMinimumRunwayLength(5000)
              }}
              style={{ fontSize: '25px' }}
            >
              Min?
            </div>
            <div>Nearest</div>
            <div
              onClick={() => {
                setSortingMethod(sortingMethod === 0 ? 1 : 0)
              }}
              style={{ fontSize: '25px' }}
            >
              Filter
            </div>
          </div>
          <div className="airports-nearest-list">
            <div>{renderNearest()}</div>
          </div>
        </div>
      )}
    </div>
  )
}
