// all the code works, however NOTAMS are not available in the free version of the API

import React from 'react'
import './notams.scss'
// import { notamUrlBuilder, type T_NotamReturnType, sampleNotam } from '../../avwxApi'

type T_NotamsProps = {
  airport: string
}

export const Notams: React.FC<T_NotamsProps> = (props: T_NotamsProps): JSX.Element => {
  // const [notams, setNotams] = React.useState<T_NotamReturnType>(sampleNotam)
  // React.useEffect(() => {
  //   const fetchNotams = async (): Promise<void> => {
  //     try {
  //       if (props.airport === undefined) return

  //       const response = await fetch(notamUrlBuilder(props.airport))
  //       const json = await response.json()

  //       setNotams(json)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   fetchNotams().catch((e) => {
  //     console.error(e)
  //   })
  // }, [props.airport])

  // const renderNotams = (): JSX.Element => {
  //   if (notams.data === undefined) return <div></div>
  //   return (
  //     <div>
  //       {notams.data.map((notam: any, key: number) => {
  //         return <div key={key}>{notam.raw}</div>
  //       })}
  //     </div>
  //   )
  // }
  return (
    <div className="notams-wrapper">
      <h1>Notams</h1>

      {/* <div>{renderNotams()}</div> */}
      <div>Notams are coming soon</div>
    </div>
  )
}
