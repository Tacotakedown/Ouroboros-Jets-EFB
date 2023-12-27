import React, { useSyncExternalStore } from 'react'
import './procedure.scss'
import { Chart } from 'navigraph/charts'
import { charts } from '../../../../../../NavigraphApi/Navigraph'
import { useNavigraphAuth } from '../../../../../../hooks/useNavigraphAuth'
import { ChartSorter } from './chartSorter'

type T_ProcedureProps = {
  airport: string
}

export const Procedure: React.FC<T_ProcedureProps> = (props: T_ProcedureProps): JSX.Element => {
  const [chartIndex, setChartIndex] = React.useState<Chart[]>([])
  const [chartBlob, setChartBlob] = React.useState<Blob | null>(null)
  const [procedurePage, setProcedurePage] = React.useState<number>(0)

  const fetchChartsIndex = (icao: string): void => {
    charts.getChartsIndex({ icao: icao }).then((idx) => idx && setChartIndex(idx))
  }

  const loadChart = (chart: Chart): void => {
    charts.getChartImage({ chart }).then((img) => setChartBlob(img))
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

  const chageProcedurePage = (page: number): void => {
    setProcedurePage(page)
  }

  React.useEffect(() => {
    fetchChartsIndex(props.airport)
  }, [props.airport])

  React.useEffect(() => {
    if (chartIndex.length) {
      console.log(chartIndex)
    }
  }, [chartIndex])

  const { user } = useNavigraphAuth()

  return (
    <div className="procedure-wrapper">
      {user && (
        <div>
          {chartBlob ? (
            <div className="chart-container">
              <div className="chart-header">
                <div
                  onClick={() => {
                    setChartBlob(null)
                  }}
                  style={{ color: 'white' }}
                >
                  Close
                </div>
              </div>

              <img className="chart" src={URL.createObjectURL(chartBlob)} alt="chart" />
            </div>
          ) : (
            ''
          )}
          <div className="procedure-buttons-continer">
            <div className="procedure-button-bar-container">
              <div
                onClick={() => {
                  setProcedurePage(0)
                }}
              >
                Airport
              </div>
              <div
                onClick={() => {
                  setProcedurePage(1)
                }}
              >
                Departure
              </div>
              <div
                onClick={() => {
                  setProcedurePage(2)
                }}
              >
                Arrival
              </div>
              <div
                onClick={() => {
                  setProcedurePage(3)
                }}
              >
                Approach
              </div>
            </div>
            {chartIndex.length ? (
              <div>
                <ChartSorter chart={chartIndex} filter={getStringFromPage(procedurePage)} handleClick={loadChart} />
              </div>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      )}
    </div>
  )
}
