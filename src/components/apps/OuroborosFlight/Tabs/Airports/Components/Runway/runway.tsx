import React from 'react'
import './runway.scss'

type T_RunwayDisplayProps = {
  ident: { ident1: string; ident2: string }
  dimensions: { width: number; length: number }
  winds: { hw: string; cw: string; isTw: boolean }
  winds2: { hw: string; cw: string; isTw: boolean }
  isCalm?: boolean
}
const RunwayDisplay: React.FC<T_RunwayDisplayProps> = (props: T_RunwayDisplayProps): JSX.Element => {
  return (
    <div className="runway-display-container">
      <div className="runway-display-left">
        <div className="runway-display-left-ident">
          {props.ident.ident1} - {props.ident.ident2}
        </div>
        <div className="runway-display-left-dimensions">
          {props.dimensions.length}' x {props.dimensions.width}'
        </div>
      </div>
      <div className="runway-display-right">
        <div className="runway-top">
          <div className="runway-display-right-ident">Rwy {props.ident.ident1}</div>

          {!props.isCalm ? (
            <div className="runway-display-right-winds">
              {' '}
              {props.winds.cw} kts{' '}
              <div style={{ color: props.winds.isTw ? '#ff0066' : '#00ffb4' }}>{props.winds.hw} kts</div>
            </div>
          ) : (
            <div className="runway-display-right-winds">Clm</div>
          )}
        </div>
        <div className="runway-bottom">
          <div className="runway-display-right-ident"> Rwy {props.ident.ident2}</div>
          {!props.isCalm ? (
            <div className="runway-display-right-winds">
              {props.winds2.cw} kts{' '}
              <div style={{ color: props.winds2.isTw ? '#ff0066' : '#00ffb4' }}>{props.winds2.hw} kts</div>
            </div>
          ) : (
            <div className="runway-display-right-winds">Clm </div>
          )}
        </div>
      </div>
    </div>
  )
}

type T_Runway = {
  length_ft: number
  width_ft: number
  ident1: string
  ident2: string
}

type T_RunwayProps = {
  airport: string
  runways: T_Runway[]
  wind: { direction: number; velocity: number }
}

export const Runway: React.FC<T_RunwayProps> = (props: T_RunwayProps): JSX.Element => {
  const formatRunwayInput = (rw: string) => {
    const cutRw = rw.slice(0, 2)

    return cutRw + '0'
  }
  const calculateCrosswindComponents = (
    runwayHeading: number,
    windD: number,
    windV: number
  ): { isTailwind: boolean; hW: string; cW: string } => {
    const GetHeadingDiff = (_Heading1: number, _Heading2: number) => {
      return Math.abs(((_Heading2 - _Heading1 + 540) % 360) - 180)
    }
    const getHW = (dif: number, v: number): number => {
      return v * Math.cos(dif)
    }
    const getCW = (dif: number, v: number): number => {
      return v * Math.sin(dif)
    }
    let dif = GetHeadingDiff(runwayHeading, windD)
    if (dif > 90) {
      let tailwindDif = dif - 90
      return {
        isTailwind: true,
        hW: Math.abs(getHW(tailwindDif, windV)).toFixed(0),
        cW: Math.abs(getCW(tailwindDif, windV)).toFixed(0)
      }
    } else
      return {
        isTailwind: false,
        hW: Math.abs(getHW(dif, windV)).toFixed(0),
        cW: Math.abs(getCW(dif, windV)).toFixed(0)
      }
  }

  return (
    <div className="runway-wrapper">
      <div className="runway-content-wrapper">
        <div style={{ padding: '20px' }}>Runways</div>
        {props.runways.map((rw) => {
          if (rw.ident1.startsWith('H')) return <></> // fuck you helicopters why the fuck are you in here
          const winds1 = calculateCrosswindComponents(
            Number(formatRunwayInput(rw.ident1)),
            props.wind.direction,
            props.wind.velocity
          )
          const winds2 = calculateCrosswindComponents(
            Number(formatRunwayInput(rw.ident2)),
            props.wind.direction,
            props.wind.velocity
          )
          return (
            <RunwayDisplay
              ident={{ ident1: rw.ident1, ident2: rw.ident2 }}
              dimensions={{ width: rw.width_ft, length: rw.length_ft }}
              winds={{ hw: winds1.hW, cw: winds1.cW, isTw: winds1.isTailwind }}
              winds2={{ hw: winds2.hW, cw: winds2.cW, isTw: winds2.isTailwind }}
              isCalm={props.wind.velocity === 0}
            />
          )
        })}
      </div>
    </div>
  )
}
