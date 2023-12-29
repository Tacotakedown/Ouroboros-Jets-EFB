import React, { type FC } from 'react'

type T_IconProps = {
  width: number
  className?: string
  ref: React.MutableRefObject<null>
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
