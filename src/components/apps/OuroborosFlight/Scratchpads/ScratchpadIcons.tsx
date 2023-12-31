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
