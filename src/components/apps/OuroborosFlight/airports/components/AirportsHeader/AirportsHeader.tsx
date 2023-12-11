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
      <div className="airports-header-title">
        Teabag <sub style={{ fontSize: '30px' }}>PRO</sub>
      </div>
      <div className="airports-header-search-group">
        <form>
          <label>
            <input
              type="text"
              className="airports-header-search-input"
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="65px" width="65px" viewBox="0 0 490.4 490.4">
            <g>
              <rect
                className="search-button-svg"
                x="0"
                y="0"
                width="490.4"
                height="490.4"
                fill="#2a2fff"
                rx={50}
                ry={50}
              />

              <g transform="scale(0.6)">
                <g transform="translate(172,172)">
                  <path
                    className="search-button-hourglass"
                    fill="white"
                    d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796   s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
