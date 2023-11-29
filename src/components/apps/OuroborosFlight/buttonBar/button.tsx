import React, { type FC, useContext } from 'react'
import { AppContext } from '../../appRouter/appRouter'
import './button.scss'

type T_ButtonBarButtonProps = {
  text: string
  to: number
  icon?: React.ReactElement
}

export const ButtonBarButton: FC<T_ButtonBarButtonProps> = (
  props: T_ButtonBarButtonProps
): JSX.Element => {
  const { state, updateState } = useContext(AppContext)

  const isActive = (): boolean => {
    if (props.to === state?.ouroborosFlight.page) return true
    else return false
  }

  const clickHandler = (page: number): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport
        }
      }
    })
  }

  return (
    <div
      onClick={() => {
        clickHandler(props.to)
      }}
      className={`${isActive() ? 'active' : ''} button`}
    >
      <div className="button-contents">
        {props.icon}
        {props.text}
      </div>
    </div>
  )
}
