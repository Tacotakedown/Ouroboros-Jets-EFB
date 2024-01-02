import { Chart } from 'navigraph/charts'
import React, { type FC, useState, useEffect, useRef } from 'react'
import './procedure.scss'

export type T_coords = {
  x: number
  y: number
}

type T_ChartSorterProps = {
  chart: Chart[]
  filter: 'APP' | 'DEP' | 'ARR' | 'APT' | '' // we will set to "ARR", "DEP", "APP" etc once i figure out how many there are
  handleClick: any // todo: give type
  setCoords: React.Dispatch<React.SetStateAction<T_coords>>
  isHovering: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChartSorter: FC<T_ChartSorterProps> = (props: T_ChartSorterProps): JSX.Element => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (item: string) => {
    setHoveredItem(item)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  useEffect(() => {
    props.isHovering(!!hoveredItem)

    if (hoveredItem && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      props.setCoords({ x: rect.left, y: rect.top })
    }
  }, [hoveredItem, props.setCoords, props.isHovering])
  const sortedCharts = props.chart.filter((chart) => chart.category === props.filter)
  if (props.filter === '') return <></>
  return (
    <div
      onMouseEnter={() => {
        props.isHovering(true)
      }}
      onMouseLeave={() => {
        props.isHovering(false)
      }}
      className="chart-sorter-wrapper"
    >
      {sortedCharts.map((chart) => (
        <div
          ref={chart.name === hoveredItem ? itemRef : null}
          className="procedure-page-chart-button"
          onClick={() => props.handleClick(chart)}
          key={chart.id}
          onMouseEnter={() => handleMouseEnter(chart.name)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="procedure-page-chart-button-text">{chart.name}</div>
        </div>
      ))}
    </div>
  )
}
