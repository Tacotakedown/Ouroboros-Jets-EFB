import React, { useEffect, useSyncExternalStore } from 'react'
import './procedure.scss'
import { Chart } from 'navigraph/charts'
import { charts } from '../../../../../../NavigraphApi/Navigraph'
import { useNavigraphAuth } from '../../../../../../hooks/useNavigraphAuth'
import { ChartSorter, T_coords } from './chartSorter'
import { ProcedureButton } from './procedureButtonBarButton'
import { AppContext } from '../../../../appRouter/appRouter'
type T_ProcedureProps = {
  airport: string
}

export const Procedure: React.FC<T_ProcedureProps> = (props: T_ProcedureProps): JSX.Element => {
  const [chartIndex, setChartIndex] = React.useState<Chart[]>([])
  const [chartBlob, setChartBlob] = React.useState<Blob | null>(null)
  const [procedurePage, setProcedurePage] = React.useState<number>(0)
  const [psudoCoords, setPsudoCoords] = React.useState<T_coords>({ x: 0, y: 0 })
  const [isHover, setIsHover] = React.useState<boolean>(false)

  const { state } = React.useContext(AppContext)

  const fetchChartsIndex = (icao: string): void => {
    charts.getChartsIndex({ icao: icao }).then((idx) => idx && setChartIndex(idx))
  }

  const loadChart = (chart: Chart): void => {
    charts
      .getChartImage({ chart, theme: state?.ouroborosFlight.darkMode ? 'dark' : 'light' })
      .then((img) => setChartBlob(img))
  }

  const getStringFromPage = (page: number): 'APP' | 'DEP' | 'ARR' | 'APT' | '' => {
    switch (page) {
      case 0:
        return 'APT'
      case 1:
        return 'DEP'
      case 2:
        return 'ARR'
      case 3:
        return 'APP'
      default:
        return ''
    }
  }

  React.useEffect(() => {
    fetchChartsIndex(props.airport)
  }, [props.airport])

  const { user } = useNavigraphAuth()

  return (
    <div className="procedure-wrapper">
      <div className="procedure-buttons-continer">
        <div className="procedure-buttons-title">Procedure</div>
        <ProcedureButton to={0} setState={setProcedurePage} state={procedurePage} text="Airport" />
        <ProcedureButton to={1} setState={setProcedurePage} state={procedurePage} text="Departure" />
        <ProcedureButton to={2} setState={setProcedurePage} state={procedurePage} text="Arrival" />
        <ProcedureButton to={3} setState={setProcedurePage} state={procedurePage} text="Approach" />
      </div>
      {chartIndex.length ? (
        <div className="procedure-chart-buttons-container">
          <div className="procedure-buttons-title">Plates</div>

          {isHover && (
            <div className="psudo-hover" style={{ left: psudoCoords.x - 630, top: psudoCoords.y - 745 }}></div>
          )}
          <ChartSorter
            setCoords={setPsudoCoords}
            isHovering={setIsHover}
            chart={chartIndex}
            filter={getStringFromPage(procedurePage)}
            handleClick={loadChart}
          />
        </div>
      ) : (
        'Loading...'
      )}
      {user && chartBlob ? (
        <div className="chart-container">
          <div className="chart-header">
            <div
              onClick={() => {
                setChartBlob(null)
              }}
              className="chart-close"
            >
              Close
            </div>
          </div>

          <img className="chart" src={URL.createObjectURL(chartBlob)} alt="chart" />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
