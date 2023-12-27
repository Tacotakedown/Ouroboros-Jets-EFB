import React from 'react'
import './AirportsDisplay.scss'
import { AirportInformationProvider } from './AptInformationProvider/AptInformationProvider'
import { toast } from 'react-toastify'

type T_AirportDisplayProps = {
  airport: string
  addFavorite: (airport: string) => void
  removeFavorite: (airport: string) => void
  favorites: string[]
  name: string
  fieldElevation: number
  flightCategory?: { flightCategory: string; color: string }
}

export const AirportDisplay: React.FC<T_AirportDisplayProps> = (props: T_AirportDisplayProps): JSX.Element => {
  return (
    <div className="airport-display">
      <div className="airport-display-title-group">
        <div className="airport-display-airport">
          {props.airport}: {props.name}
        </div>
        <div
          onClick={() => {
            if (props.favorites.includes(props.airport)) {
              props.removeFavorite(props.airport)
            } else {
              if (props.favorites.length >= 12) {
                toast('You can only have 12 favorites')
                return
              }

              props.addFavorite(props.airport)
            }
          }}
          className="airports-favorite-button"
        >
          <svg viewBox="0 0 65 60" width={50}>
            <path
              stroke="yellow"
              strokeWidth={5}
              fill={props.favorites.includes(props.airport) ? 'yellow' : 'none'}
              d="M 46.296296,51.906272 L 31.916351,42.474649 L 17.502712,51.8547 L 22.029072,35.264028 L 8.654054,24.454438 L 25.831443,23.632463 L 31.978866,7.5717174 L 38.068716,23.65438 L 55.243051,24.537884 L 41.829396,35.299492 L 46.296296,51.906272 z "
            />
          </svg>
        </div>
      </div>

      <div className="airport-display-divider">
        <div className="airport-display-left-content">
          <AirportInformationProvider
            field="Latest Weather"
            content={props.flightCategory?.flightCategory ?? 'unknown'}
            color={props.flightCategory?.color ?? 'grey'}
            isWeather={true}
          />
          <AirportInformationProvider field="Elevation" content={props.fieldElevation.toString()} />
          <AirportInformationProvider field="Pattern Altitude" content={(props.fieldElevation + 1000).toString()} />

          {/* <AirportInformationProvider field="Procedures" content="ILS, RNAV, VOR" /> */}
        </div>
        {/* <div className="airport-display-right-content">
          <AirportInformationProvider field="ATIS" content="123.45" />
          <AirportInformationProvider field="Clearance" content="123.45" />
          <AirportInformationProvider field="Ground" content="123.45" />
          <AirportInformationProvider field="Tower" content="123.45" />
          <AirportInformationProvider field="Appr & Dep" content="123.45" />
        </div> */}
      </div>
    </div>
  )
}
