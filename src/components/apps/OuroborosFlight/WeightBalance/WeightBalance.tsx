import React, { useState, useEffect } from 'react'
import envolope from '../../img/cg_limits.png'
import './weightAndBalance.css'
import {
  getCg,
  getFuelCG,
  getLdgCg,
  getLW,
  getMAC,
  getPsgrMoment,
  getPsgrWeight,
  getTOCg,
  getTOW,
  getZfCg,
  getZfw
} from './weightAndBalance'
// import { SimBriefApi } from '../simbrief/simbriefApi';

export const WeightAndBalance = (): JSX.Element => {
  const [id, setId] = useState(() => {
    // getting stored value
    const id: any = localStorage.getItem('simbriefId')
    const initialValue = JSON.parse(id)
    return initialValue ?? ''
  })
  const [simbriefData, setSimbriefData] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return initialValue ?? ''
  })

  useEffect(() => {
    localStorage.setItem('simbriefId', JSON.stringify(id))
  }, [id])

  const getSimbriefData = async (): Promise<void> => {
    try {
      const response = await fetch(`https://www.simbrief.com/api/xml.fetcher.php?userid=${id}&json=1`)
      const json = await response.json()

      setSimbriefData(json)
    } catch (e) {
      console.error(e)
    }

    //  https://www.simbrief.com/api/xml.fetcher.php?userid=555605&json=1  api call
  }
  const [BEW] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return Number(initialValue?.weights.oew) ?? 46840.8
    // return 46840.8;
  }) // this will represent OEW for now unitl we implement waste and potable water

  const [BEM] = useState(25347355.76) // same for this, OEW for now
  const [passangers] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return Number(initialValue?.weights.pax_count) ?? 0
  }) // to be replaced with simvar

  const [fuel] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return initialValue?.fuel.plan_takeoff / 6.767 ?? 0
  })

  const [fuelBurn] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return Number(initialValue?.fuel.enroute_burn / 6.767) ?? 0
  })

  const [fwdCargo] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return Number(initialValue?.weights.cargo * 0.75) ?? 0
  }) // max 3020.3 lb

  const [aftCargo] = useState(() => {
    const data: any = localStorage.getItem('simbriefData')
    const initialValue = JSON.parse(data)
    return Number(initialValue?.weights.cargo * 0.25) ?? 0
  }) // max 2270.7 lb

  return (
    <div>
      <div className="weightAndBalanceContainer">
        <div className="WBsliderContainer">
          <div>Passangers: {passangers}</div>
          <div>fuel: {Math.round(fuel * 6.767)}lbs</div>
          <div>cargo:{fwdCargo + aftCargo}</div>
          <div
            onClick={() => {
              getSimbriefData().catch((e) => {
                console.error(e)
              })
            }}
          >
            Get simbrief Data
          </div>
          <form>
            <label>
              simbrief id
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value)
                }}
              />
            </label>
          </form>
        </div>

        <img src={envolope} alt="cgLimits" />
        <div
          style={{
            position: 'absolute',
            left: '1200px',
            top: '500px',
            width: '720px',
            height: '860px'
          }}
        >
          <svg viewBox="0 0 200 200">
            <circle
              cx={getTOCg(fuel, BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 37}
              cy={-getTOW(fuel, BEW, passangers, fwdCargo, aftCargo) / 239 + 381} // MTOW = 25 50000LBS=172
              r={3}
              fill="none"
              stroke="#007BFA"
              strokeWidth={2}
            />
            <rect
              x={getLdgCg(fuel, fuelBurn, BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 34}
              y={-getLW(fuel, fuelBurn, BEW, passangers, fwdCargo, aftCargo) / 239 + 378}
              width={6}
              height={6}
              fill="none"
              stroke="#007BFA"
              strokeWidth={2}
            />
            <g
              transform={`translate(${getZfCg(BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 37},${
                -getZfw(BEW, passangers, fwdCargo, aftCargo) / 239 + 381 - 4
              })`}
            >
              <rect
                x={0}
                y={0}
                width={6}
                height={6}
                transform="rotate(45)"
                fill="none"
                stroke="#778899"
                strokeWidth={2}
              />
            </g>

            <path
              d={`M${getTOCg(fuel, BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 37},${
                -getTOW(fuel, BEW, passangers, fwdCargo, aftCargo) / 239 + 381
              } L ${getLdgCg(fuel, fuelBurn, BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 37} ${
                -getLW(fuel, fuelBurn, BEW, passangers, fwdCargo, aftCargo) / 239 + 381
              }`}
              stroke="white"
              strokeWidth={1}
              strokeLinecap="round"
            />
            <path
              d={`M${getLdgCg(fuel, fuelBurn, BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 37},${
                -getLW(fuel, fuelBurn, BEW, passangers, fwdCargo, aftCargo) / 239 + 381
              } L ${getZfCg(BEW, BEM, passangers, fwdCargo, aftCargo) * 3.64 + 37} ${
                -getZfw(BEW, passangers, fwdCargo, aftCargo) / 239 + 381
              }`}
              stroke="#778899"
              strokeWidth={1}
              strokeLinecap="round"
              strokeDasharray={2}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
