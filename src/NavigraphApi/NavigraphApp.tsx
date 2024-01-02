import { NoPackagesFoundError, RequestFailedError } from '@navigraph/app'
import { type NavigraphPackage } from '@navigraph/packages'
import React, { useCallback, useState } from 'react'
import Auth from './components/auth'
import { useNavigraphAuth } from '../hooks/useNavigraphAuth'
import { charts, packages } from './Navigraph'
import { type Chart } from 'navigraph/charts'

const AIRPORT_ICAO = 'KPHX'

export const NavigraphAppPage = () => {
  const [output, setOutput] = useState<string | undefined>(undefined)
  const [packageDetails, setPackageDetails] = useState<NavigraphPackage | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [chartIndex, setChartIndex] = useState<Chart[]>([])
  const [chartBlob, setChartBlob] = useState<Blob | null>(null)

  const { user } = useNavigraphAuth()

  const handleNavigraphError = useCallback(
    (error: unknown) => {
      if (error instanceof NoPackagesFoundError) setErrorMessage('No packages found')
      else if (error instanceof RequestFailedError) setErrorMessage('Failed to fetch packages')
      else if (error instanceof Error) setErrorMessage('An unknown error occurred')
      else setErrorMessage('An unknown error occurred: ' + (error as string))
    },
    [setErrorMessage]
  )

  const fetchChartsIndex = (): void => {
    charts.getChartsIndex({ icao: AIRPORT_ICAO }).then((d: Chart[] | null) => {
      d !== null && setChartIndex(d)
    })
  }

  const loadChart = (chart: Chart): void => {
    charts.getChartImage({ chart }).then((b) => {
      setChartBlob(b)
    })
  }

  const fetchPackage = async (): Promise<void> =>
    packages
      .getPackage()
      .then((pkg) => {
        setPackageDetails(pkg)
      })
      .catch((err) => {
        handleNavigraphError(err)
      })

  const listPackages = async (): Promise<void> =>
    packages
      .listPackages()
      .then((pkgs) => {
        setOutput(JSON.stringify(pkgs, null, 2))
      })
      .catch((err) => {
        handleNavigraphError(err)
      })

  return (
    <div>
      <h1>Navigraph charts</h1>

      <Auth />

      {user && (
        <>
          <div>
            <h2>Welcome, {user.preferred_username}</h2>
            <button
              onClick={() => {
                fetchChartsIndex()
              }}
            >
              list {AIRPORT_ICAO} charts
            </button>
            <button onClick={listPackages}>List available packages</button>
            <button onClick={fetchPackage}>Fetch default package</button>
            {packageDetails && (
              <a href={packageDetails.file?.url} className="text-blue-500 hover:text-blue-700">
                Download {packageDetails.format}
              </a>
            )}
            {errorMessage && <span className="text-red-500 hover:text-red-700">{errorMessage}</span>}
          </div>
        </>
      )}
      {output && (
        <pre className="text-sm max-h-[40vh] max-w-[90vw] overflow-auto">
          {/* {output} */}
          {chartBlob ? (
            <img className="w-full h-full object-contain" src={URL.createObjectURL(chartBlob)} alt="chart" />
          ) : (
            'no chart loaded'
          )}
          <div>
            {chartIndex.length
              ? chartIndex.map((c) => (
                  <button key={c.id} className="p-2 bg-black w-full" onClick={() => loadChart(c)}>
                    <span className="text-xs">{c.name}</span>
                  </button>
                ))
              : 'No index loaded'}
          </div>
        </pre>
      )}
    </div>
  )
}
