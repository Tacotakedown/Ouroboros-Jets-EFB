import React, { useEffect } from 'react'
import './ChecklistSelectorButton.scss'

type T_ChecklistSelectorButtonProps = {
  text: string
  onClick: (index: number) => void
  to: number
  completedChecklists: boolean[]
  activeChecklist: number | null
  dividerAbove?: boolean
}

export const ChecklistSelectorButton: React.FC<T_ChecklistSelectorButtonProps> = (
  props: T_ChecklistSelectorButtonProps
): JSX.Element => {
  const active: boolean = props.activeChecklist === props.to
  const completed: boolean = props.completedChecklists[props.to]
  const [showArrow, setShowArrow] = React.useState<boolean>(false)

  useEffect(() => {
    if (!active) {
      setShowArrow(false)
    } else {
      setTimeout(() => {
        setShowArrow(active)
      }, 100)
    }
  }, [active])

  return (
    <div
      style={{ top: props.to * 87 + 72 + 'px' }}
      className={`${
        props.dividerAbove !== null && props.dividerAbove !== undefined && props.dividerAbove
          ? 'checklist-selector-button-divider-above'
          : 'checklist-selector-button'
      } ${active ? 'selector-button-active' : 'checklist-selector-button-text'}`}
      onClick={() => {
        props.activeChecklist !== props.to && props.onClick(props.to)
      }}
    >
      <div className="checklist-selector-left-text">
        <svg width={40} viewBox="0 0 240 240">
          <path
            fill={completed ? '#00ffb4' : '#150B26'}
            d="M230.24876,80.10179l3.56483,3.56483c6.71123,6.71123,6.71123,17.59228,0,24.30351L113.40904,228.37469
	c-6.71123,6.71123-17.59229,6.71123-24.30351,0L6.99719,146.26636c-6.71123-6.71123-6.71123-17.59229,0-24.3035l3.56484-3.56484
	c6.71123-6.71123,17.59228-6.71123,24.30351,0l54.24,54.24001c6.71123,6.71123,17.59229,6.71123,24.30351,0l92.53622-92.53622
	C212.65649,73.39056,223.53754,73.39056,230.24876,80.10179z"
          />
        </svg>

        {props.text}
      </div>
      {showArrow ? (
        <svg className={`fade-in-anim ${active ? '' : 'arrow-force-hide'}`} width={20} viewBox="0 0 240 240">
          {/** stupid solution but for some reason there was one extra render before the useEffect could set the showArrow to false making it appear for a split second on last button clicked */}
          <path
            fill="white"
            d="M116.42586,119.52027v-3.15111c0-0.88866,0.96201-1.44408,1.73161-0.99975l2.72894,1.57555l2.72894,1.57556
	c0.7696,0.44433,0.7696,1.55515,0,1.99948l-2.72894,1.57555l-2.72894,1.57556c-0.7696,0.44433-1.73161-0.11108-1.73161-0.99975
	V119.52027z"
          />
          <path
            fill="white"
            d="M14.29402,120V34.22571c0-24.18964,26.18605-39.30816,47.13489-27.21334l74.28271,42.88715l74.28271,42.88715
	c20.94885,12.09482,20.94885,42.33187,0,54.42669l-74.28271,42.88715l-74.28271,42.88715
	c-20.94884,12.09482-47.13489-3.02371-47.13489-27.21335V120z"
          />
        </svg>
      ) : null}
    </div>
  )
}
