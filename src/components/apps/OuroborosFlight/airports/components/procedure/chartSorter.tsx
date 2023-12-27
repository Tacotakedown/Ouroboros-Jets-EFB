import { Chart } from 'navigraph/charts'
import React, { type FC } from 'react'

type T_ChartSorterProps = {
  chart: Chart[]
  filter: 'APP' | 'DEP' | 'ARR' | 'APT' | '' // we will set to "ARR", "DEP", "APP" etc once i figure out how many there are
  handleClick: any // todo: give type
}

export const ChartSorter: FC<T_ChartSorterProps> = (props: T_ChartSorterProps): JSX.Element => {
  const sortedCharts = props.chart.filter((chart) => chart.category === props.filter)
  if (props.filter === '') return <></>
  return (
    <div>
      {sortedCharts.map((chart) => (
        <div onClick={() => props.handleClick(chart)} key={chart.id}>
          {chart.name}
        </div>
      ))}
    </div>
  )
}
