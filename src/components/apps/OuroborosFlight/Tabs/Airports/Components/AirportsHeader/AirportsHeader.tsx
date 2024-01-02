import React from 'react'
import './AirportsHeader.scss'
import { AirplaneIcon } from '../../../../Components/ButtonBar/icons/buttonBarIcons'

type T_AirportsHeaderProps = {
  setAirport: (airport: string) => void
  airport: string
  changeAirport: (airport: string) => void
  settingsButtonCallback: React.Dispatch<React.SetStateAction<boolean>>
}

export const AirportsHeader: React.FC<T_AirportsHeaderProps> = (props: T_AirportsHeaderProps): JSX.Element => {
  return (
    <div className="airports-header">
      {/* <div className="search-results-container">i am the search results container</div> */}
      <div className="airports-header-title">
        <AirplaneIcon width={70} /> FlightBag <sub style={{ fontSize: '30px' }}>PRO</sub>
      </div>
      <div className="airports-header-search-group">
        <div
          className="settings-cog-container"
          onClick={() => {
            props.settingsButtonCallback(true)
          }}
        >
          <svg
            height="512px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="70px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="settings-cog-svg"
              d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"
            />
          </svg>
        </div>
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
