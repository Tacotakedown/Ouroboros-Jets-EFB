import React from 'react'
import { type IMetar } from 'metar-taf-parser'
import { getFlightCategory } from '../../../../common/getFlightCategory'
import './metarProvider.scss'

type T_metarOrganizerProps = {
  field: string
  text: JSX.Element
  colorOvrd?: string
  textArray?: boolean
}

const MetarOrganizer: React.FC<T_metarOrganizerProps> = (props: T_metarOrganizerProps): JSX.Element => {
  return (
    <div className="metar-organizer-container">
      <div className="metar-organizer-field"> {props.field}</div>
      <div className="metar-organizer-content" style={{ color: props.colorOvrd ?? '' }}>
        {props.text}
      </div>
    </div>
  )
}

type T_MetarProviderProps = {
  metar: string | undefined | null
  parsedMetar: IMetar | undefined
  fieldElev: number
}

export const MetarProvider: React.FC<T_MetarProviderProps> = (props: T_MetarProviderProps): JSX.Element => {
  if (props.metar === undefined) return <div className="metar-wrapper">Loading...</div>
  if (props.parsedMetar === undefined) return <div className="metar-wrapper">Loading...</div>

  const flightCategory = getFlightCategory(
    {
      type: props.parsedMetar?.clouds[props.parsedMetar.clouds.length - 1]?.quantity ?? '',
      height: props.parsedMetar?.clouds[props.parsedMetar.clouds.length - 1]?.height ?? 0
    },
    props.parsedMetar?.visibility?.value ?? 999
  )

  const cToF = (temp: number): number | null => {
    if (temp === 999) return null
    return temp * (9 / 5) + 32
  }
  const padNumber = (num: number | undefined): string => {
    if (num === undefined) return ''
    return num < 10 ? '0' + num.toString() : num.toString()
  }

  const calculateRelativeHumidity = (
    temperatureCelsius: number | undefined,
    dewPointCelsius: number | undefined
  ): number | null => {
    if (temperatureCelsius == undefined || dewPointCelsius == undefined) return null

    const a = 17.27
    const b = 237.7
    const saturationVaporPressureTemp = 6.112 * Math.exp((a * temperatureCelsius) / (b + temperatureCelsius))
    const saturationVaporPressureDewPoint = 6.112 * Math.exp((a * dewPointCelsius) / (b + dewPointCelsius))

    const actualVaporPressure = saturationVaporPressureDewPoint

    const relativeHumidity = (actualVaporPressure / saturationVaporPressureTemp) * 100

    return relativeHumidity
  }

  const calculateDensityAltitude = (
    altimeterSettingInHg: number | undefined,
    elevationFeet: number | undefined,
    temperatureCelsius: number | undefined
  ): number | null => {
    if (altimeterSettingInHg == undefined || elevationFeet === undefined || temperatureCelsius == undefined) return null
    const standardTemperatureSeaLevel = 15
    const pressureAltitude = (altimeterSettingInHg - 29.92) * 1000 + elevationFeet
    const temperatureAtAltitude = standardTemperatureSeaLevel - (pressureAltitude / 1000) * 2
    const densityAltitude = pressureAltitude + 120 * (temperatureCelsius - temperatureAtAltitude)

    return Math.round(densityAltitude)
  }

  const DA = calculateDensityAltitude(
    props.parsedMetar.altimeter?.value,
    props.fieldElev,
    props.parsedMetar.temperature
  )

  const decodeWeatherIndensity = (type: string): string => {
    if (type == '-') {
      return 'Light'
    } else if (type == '') {
      return ''
    } else if (type == '+') {
      return 'Heavy'
    } else if ((type = 'VC')) {
      return 'Vicinity'
    } else return '' // there are a shit ton of these but too lazy rn
  }
  const decodeWeatherType = (type: string): string => {
    if (type == 'DZ') {
      return 'Drizzle'
    } else if (type == 'RA') {
      return 'Rain'
    } else if (type == 'SN') {
      return 'Snow'
    } else if (type == 'SG') {
      return 'Snow Grains'
    } else if (type == 'IC') {
      return 'Ice Grains'
    } else if (type == 'PL') {
      return 'Ice Pellets'
    } else if (type == 'GR') {
      return 'Hail'
    } else if (type == 'GS') {
      return 'Small Hail'
    } else if (type == 'UP') {
      return 'Unknown Precipitation'
    } else if (type == 'BR') {
      return 'Mist'
    } else if (type == 'FG') {
      return 'Fog'
    } else if (type == 'FU') {
      return 'Smoke'
    } else if (type == 'VA') {
      return 'Volcanic Ash'
    } else if (type == 'DU') {
      return 'Widespread Dust'
    } else if (type == 'SA') {
      return 'Sand'
    } else if (type == 'HZ') {
      return 'Haze'
    } else if (type == 'PY') {
      return 'Spray'
    } else if (type == 'PO') {
      return 'Sand Whirls'
    } else if (type == 'SQ') {
      return 'Squalls'
    } else if (type == 'FC') {
      return 'Funnel Cloud'
    } else if (type == 'SS') {
      return 'Sandstorm'
    } else if (type == 'DS') {
      return 'Duststorm'
    } else return ''
  }

  // WE NEED DESCRIPTORS!!! FREEZING RAIN CANNOT BE DISPLAYED WITHOUT PARSING IT
  /**
   * MI Shallow
   * PR Partial
   * BC Patches
   * DR Low Drifting
   * BL Blowing
   * SH Showers
   * TS Thunderstorm
   * FZ Freezing
   *
   */
  const decodeWeatherDescriptor = (discriminator: string): string => {
    if (discriminator === 'MI') {
      return 'Shallow'
    } else if (discriminator === 'PR') {
      return 'Partial'
    } else if (discriminator === 'BC') {
      return 'Patches'
    } else if (discriminator === 'DR') {
      return 'Low Drifting'
    } else if (discriminator === 'BL') {
      return 'Blowing'
    } else if (discriminator === 'SH') {
      return 'Showers'
    } else if (discriminator === 'TS') {
      return 'Thunderstorm'
    } else if (discriminator === 'FZ') {
      return 'Freezing'
    } else {
      return ''
    }
  }

  const humidity = calculateRelativeHumidity(props.parsedMetar.temperature, props.parsedMetar.dewPoint)

  return (
    <div className="metar-wrapper">
      <div className="metar-header">
        <div className="flight-cat-group">
          <div className="flight-cat-bubble" style={{ backgroundColor: flightCategory.color }} />
          <div style={{ color: flightCategory.color }}>{flightCategory.flightCategory}</div>
        </div>
      </div>
      <div className="metar-raw" style={{ color: flightCategory.color }}>
        {props.metar}
      </div>
      <MetarOrganizer
        field="Time:"
        text={<div>{padNumber(props.parsedMetar.hour) + ':' + padNumber(props.parsedMetar.minute) + 'z'}</div>}
      />
      <MetarOrganizer
        field="Wind:"
        text={
          <div>
            {props.parsedMetar.wind?.degrees === 0 ? (
              <div>Calm</div>
            ) : (
              <div>
                {props.parsedMetar.wind?.direction === 'VRB' ? (
                  <div>
                    Variable at {props.parsedMetar.wind?.speed}
                    {props.parsedMetar.wind?.gust !== undefined ? ' - ' + props.parsedMetar.wind?.gust + ' ' : ' '}
                    knots
                  </div>
                ) : (
                  <div>
                    {props.parsedMetar.wind?.degrees}° at {props.parsedMetar.wind?.speed}
                    {props.parsedMetar.wind?.gust !== undefined ? ' - ' + props.parsedMetar.wind?.gust + ' ' : ' '}
                    knots
                  </div>
                )}
              </div>
            )}
          </div>
        }
      />
      <MetarOrganizer field="Visibility:" text={<div> {props.parsedMetar.visibility?.value} sm</div>} />
      {props.parsedMetar.clouds.length ? (
        <MetarOrganizer
          field=" Clouds (AGL):"
          text={
            <div>
              {props.parsedMetar?.clouds[props.parsedMetar.clouds.length - 1]?.quantity}{' '}
              {props.parsedMetar?.clouds[props.parsedMetar.clouds.length - 1]?.height}'
            </div>
          }
        />
      ) : (
        ''
      )}

      {props.parsedMetar.weatherConditions.length ? (
        <MetarOrganizer
          field=" Weather:"
          colorOvrd="red"
          text={
            <div>
              {props.parsedMetar.weatherConditions.map((c) => {
                return (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {decodeWeatherIndensity(c.intensity ?? '')} {decodeWeatherDescriptor(c.descriptive ?? '')}{' '}
                    {c.phenomenons.map((w) => decodeWeatherType(w))}
                  </div>
                )
              })}
            </div>
          }
        />
      ) : (
        ''
      )}
      <MetarOrganizer
        field="Temperature: "
        text={
          <div>
            {props.parsedMetar.temperature}°C ({cToF(props.parsedMetar.temperature ?? 999)})°F
          </div>
        }
      />
      <MetarOrganizer
        field="Dewpoint:"
        text={
          <div>
            {props.parsedMetar.dewPoint}°C ({cToF(props.parsedMetar.dewPoint ?? 999)})°F
          </div>
        }
      />
      <MetarOrganizer
        field=" Altimeter: "
        text={
          <div>
            {props.parsedMetar.altimeter?.value} {props.parsedMetar.altimeter?.unit}
          </div>
        }
      />
      <MetarOrganizer field="Humidity: " text={<div>{humidity && humidity.toFixed(0) + '%'}</div>} />
      <MetarOrganizer field="Density Altitude:" text={<div> {DA}'</div>} />
    </div>
  )
}
