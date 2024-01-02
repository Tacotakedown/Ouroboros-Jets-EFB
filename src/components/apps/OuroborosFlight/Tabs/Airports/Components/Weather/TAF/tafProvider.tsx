import React from 'react'
import { type ITAF } from 'metar-taf-parser'

type T_TafProviderProps = {
  taf: string | undefined | null
  parsedTaf: ITAF | undefined
}

export const TafProvider: React.FC<T_TafProviderProps> = (props: T_TafProviderProps): JSX.Element => {
  return (
    <div>
      <div>{props.taf}</div>
    </div>
  )
}
