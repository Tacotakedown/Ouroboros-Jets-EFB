import React, { type FC, useContext } from 'react'
import { AppContext } from '../../appRouter/appRouter'
import './button.scss'

type T_ButtonBarButtonProps = {
  text: string
  to: number
  icon?: React.ReactElement
  setActiveButton: (button: number) => void
}

export const ButtonBarButton: FC<T_ButtonBarButtonProps> = (props: T_ButtonBarButtonProps): JSX.Element => {
  const { state, updateState } = useContext(AppContext)

  const isActive = (): boolean => {
    if (props.to === state?.ouroborosFlight.page) return true
    else return false
  }

  const clickHandler = (page: number): void => {
    updateState({
      state: {
        ...state,
        ouroborosFlight: {
          page: page,
          currentAirport: state?.ouroborosFlight?.currentAirport,
          currentChart: state?.ouroborosFlight?.currentChart,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: state?.ouroborosFlight.darkMode
        }
      }
    })
  }

  return (
    <div
      onClick={() => {
        clickHandler(props.to)
        props.setActiveButton(props.to)
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
