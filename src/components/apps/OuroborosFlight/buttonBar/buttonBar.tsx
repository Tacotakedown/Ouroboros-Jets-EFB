import React from 'react'
import { ButtonBarButton } from './button'
import './buttonBar.scss'
import { AirportsIcon } from './icons/buttonBarIcons'

type T_ButtonBarProps = {
  recentButton: {
    text: string
    to: number
    icon?: JSX.Element
  }
}
export const ButtonBar: React.FC<T_ButtonBarProps> = (props: T_ButtonBarProps): JSX.Element => {
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
    </div>
  )
}
