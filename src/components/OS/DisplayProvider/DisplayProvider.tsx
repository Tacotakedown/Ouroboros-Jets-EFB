import React from 'react'
import { OsHome } from '../Home/Home'
import { LoadContext, OsRouterContext } from '../../../hooks/OsRouter'
import { OuroborosFlight } from '../../apps/OuroborosFlight/OuroborosFlight'
import { AppContext } from '../../apps/appRouter/appRouter'
import { NavigraphAppPage } from '../../../NavigraphApi/NavigraphApp'

export const DisplayProvider = (): JSX.Element => {
  const OSContext = LoadContext(OsRouterContext)
  const { state, updateState } = React.useContext(AppContext)

  React.useEffect(() => {
    if (state === undefined) {
      // Manually set the state to default values i dont know why it wasnt defined but this fixes it ig
      updateState({
        state: {
          ouroborosFlight: {
            page: 0,
            currentChart: 'defaultChart',
            currentAirport: 'KPHX',
            favorites: [''],
            darkMode: false,
            scratchpads: [],
            scratchpadSvg: []
          },
          checklists: {
            currentChecklist: null,
            completedChecklists: [false, false, false, false, false, false, false, false, false, false]
          }
        }
      })
    }
  }, [state, updateState])

  const OsAppSwitch = (): JSX.Element => {
    switch (OSContext.page) {
      case 0:
        return <OsHome />
      case 1:
        return <OuroborosFlight />
      case 2:
        return <NavigraphAppPage />
      default:
        return <OsHome />
    }
  }

  return OsAppSwitch()
}
