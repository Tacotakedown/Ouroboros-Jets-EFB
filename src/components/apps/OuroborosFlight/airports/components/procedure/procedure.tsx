import React from 'react'
import './procedure.scss'

type T_ProcedureProps = {
  airport: string
}

export const Procedure: React.FC<T_ProcedureProps> = (props: T_ProcedureProps): JSX.Element => {
  return (
    <div className="procedure-wrapper">
      <h1>Procedure</h1>
      <div>{props.airport}</div>
    </div>
  )
}
