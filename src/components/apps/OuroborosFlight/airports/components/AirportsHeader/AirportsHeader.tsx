import React from 'react'
import './AirportsHeader.scss'

type T_AirportsHeaderProps = {
  setAirport: (airport: string) => void
  airport: string
  changeAirport: (airport: string) => void
}

export const AirportsHeader: React.FC<T_AirportsHeaderProps> = (props: T_AirportsHeaderProps): JSX.Element => {
  return (
    <div className="airports-header">
      <div className="airports-header-title">Ouroboros Flight</div>
      <div className="airports-header-search-group">
        <form>
          <label>
            <input
              type="text"
              style={{ fontSize: '30px' }}
              value={props.airport}
              onChange={(e) => {
                props.setAirport(e.target.value)
              }}
            />
          </label>
        </form>
        <div
          className="airports-header-search-button"
          onClick={() => {
            props.changeAirport(props.airport)
          }}
        >
          Search
        </div>
      </div>
    </div>
  )
}
