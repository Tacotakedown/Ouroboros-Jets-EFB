import React, { type FC } from 'react'

type T_IconProps = {
  width: number
  className?: string
  ref: React.MutableRefObject<null>
}
type T_bgProps = {
  width: number
}

export const SpPopoutIcon: FC<T_IconProps> = (props: T_IconProps): JSX.Element => {
  return (
    <svg ref={props.ref} className={props.className} width={`${props.width}px`} viewBox="0 0 100 100">
      <path
        stroke="#2a2fff"
        strokeWidth={1}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10,10 L 30,10 L50,0 L70,10  L90,10 A10,10 0 0 1 100,20 L100,80 A10,10 0 0 1 90,90 L10,90 A10,10 0 0 1 0,80 L0,20 A10,10 0 0 1 10,10 Z"
        fill="#16175c"
      />
    </svg>
  )
}
export const SpBGCraft: FC<T_bgProps> = (props: T_bgProps): JSX.Element => {
  return (
    <svg width={`${props.width}px`} viewBox="51.234 32.356 1787.128 1196.668" xmlns="http://www.w3.org/2000/svg">
      <text fill="white" fontSize={72} x="150.151" y="128.22" dx="23.561" dy="71.78">
        C
      </text>
      <text fill="white" fontSize={72} x="999.873" y="-158.231" dx="-826.161" dy="558.231">
        R
      </text>
      <text fill="white" fontSize={72} x="387.311" y="415.009" dx="-211.589" dy="184.991">
        A
      </text>
      <text fill="white" fontSize={72} x="134.846" y="504.394" dx="42.918" dy="295.606">
        F
      </text>
      <text fill="white" fontSize={72} x="144.601" y="646.498" dx="33.163" dy="353.502">
        T
      </text>
    </svg>
  )
}

export const SpBgAtis: FC<T_bgProps> = (props: T_bgProps): JSX.Element => {
  return (
    <svg width={`${props.width}px`} viewBox="0 0 1800 1200" xmlns="http://www.w3.org/2000/svg">
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="49.51"
        y="62.21"
        width="850.49"
        height="137.79"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="925.785"
        y="62.21"
        width="850.49"
        height="137.79"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="44.509"
        y="228.544"
        width="850.49"
        height="171.456"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="920.784"
        y="228.544"
        width="850.49"
        height="171.456"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="44.705"
        y="442.683"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="920.98"
        y="442.683"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="43.947"
        y="584.442"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="920.222"
        y="584.442"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="43.687"
        y="724.073"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="919.962"
        y="724.073"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="43.777"
        y="881.39"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="920.052"
        y="881.39"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="44.801"
        y="1029.041"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <rect
        fill="transparent"
        stroke="white"
        strokeWidth={6}
        x="921.076"
        y="1029.041"
        width="850.49"
        height="118.61"
        rx="10"
        ry="10"
      />
      <text
        fontSize={73}
        fill="white"
        transform="matrix(1.2290329933166504, 0, 0, 1.2290329933166504, -45.74797821044922, 41.262577056884766)"
      >
        <tspan x="254.684" y="101.505">
          Departure
        </tspan>
      </text>
      <text
        fontSize={73}
        fill="white"
        transform="matrix(1.2290329933166504, 0, 0, 1.2290329933166504, 911.872802734375, 38.153472900390625)"
      >
        <tspan x="254.684" y="101.505">
          Arrival
        </tspan>
      </text>
      <ellipse
        fill="transparent"
        strokeWidth={10}
        paintOrder="fill"
        stroke="white"
        cx="145.136"
        cy="314.27"
        rx="75.794"
        ry="75.794"
      />
      <ellipse
        fill="transparent"
        strokeWidth={10}
        paintOrder="fill"
        stroke="white"
        cx={1014.496}
        cy={315.622}
        rx={75.794}
        ry={75.794}
      />
      <text fontSize={73} fill="white" x="336.256" y="335.538">
        Information
      </text>
      <text fontSize={73} fill="white" x="1220.259" y="334.794">
        Information
      </text>
      <text fill="white" fontSize={50} x="67.187" y="521.045">
        Wind
      </text>
      <text fill="white" fontSize={50} x="65.281" y="661.904">
        Altimeter
      </text>
      <text fill="white" fontSize={50} x="65.48" y="803.222">
        Sky
      </text>
      <text fill="white" fontSize={50} x="66.44" y="958.298">
        Temp/DP
      </text>
      <text fill="white" fontSize={50} x="69.056" y="1105.473">
        Runway
      </text>
      <text fill="white" fontSize={50} x="943.441" y="521.884">
        Wind
      </text>
      <text fill="white" fontSize={50} x="941.535" y="662.743">
        Altimeter
      </text>
      <text fill="white" fontSize={50} x="941.734" y="804.061">
        Sky
      </text>
      <text fill="white" fontSize={50} x="942.694" y="959.137">
        Temp/DP
      </text>
      <text fill="white" fontSize={50} x="945.31" y="1106.312">
        Runway
      </text>
    </svg>
  )
}
