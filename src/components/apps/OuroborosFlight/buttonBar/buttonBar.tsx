import React from 'react'
import { ButtonBarButton } from './button'
import './buttonBar.scss'
import { AirportsIcon } from './icons/buttonBarIcons'
import { AppContext } from '../../appRouter/appRouter'

type T_ButtonBarProps = {
  recentButton: {
    text: string
    to: number
    icon?: JSX.Element
  }
}
export const ButtonBar: React.FC<T_ButtonBarProps> = (props: T_ButtonBarProps): JSX.Element => {
  const { state, updateState } = React.useContext(AppContext)
  const setDarkMode = (darkMode: boolean): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: darkMode
        }
      }
    })
  }

  const [activeButton, setActiveButton] = React.useState<number>(0)
  return (
    <div className="button-bar">
      <ButtonBarButton setActiveButton={setActiveButton} text="Airports" to={0} icon={<AirportsIcon width={20} />} />
      <ButtonBarButton setActiveButton={setActiveButton} text="Maps" to={1} />
      <ButtonBarButton setActiveButton={setActiveButton} text="Plates" to={2} />
      {/* <ButtonBarButton text="Documents" to={3} /> */}
      <ButtonBarButton setActiveButton={setActiveButton} text="ScratchPads" to={4} />
      <ButtonBarButton setActiveButton={setActiveButton} text="Checklists" to={5} />
      <ButtonBarButton setActiveButton={setActiveButton} text="W & B" to={6} />
      <div
        onClick={() => {
          setDarkMode(!state?.ouroborosFlight.darkMode)
        }}
        style={{ backgroundColor: state?.ouroborosFlight.darkMode ? 'blue' : '' }}
      >
        Dark Mode
      </div>
    </div>
  )
}
