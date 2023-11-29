import React from 'react'
import { OsHome } from '../Home/Home'
import { AppRouter } from '../../apps/appRouter/appRouter'
import { LoadContext, OsRouterContext } from '../../../hooks/OsRouter'
import { OuroborosFlight } from '../../apps/OuroborosFlight/OuroborosFlight'

export const DisplayProvider = (): JSX.Element => {
  const OSContext = LoadContext(OsRouterContext)
  const OsAppSwitch = (): JSX.Element => {
    switch (OSContext.page) {
      case 0:
        return <OsHome />
      case 1:
        return <OuroborosFlight />
      case 2:
        return <div>Chrome</div>
      default:
        return <OsHome />
    }
  }

  return (
    <div>
      <AppRouter>
        <div>{OsAppSwitch()}</div>
      </AppRouter>
    </div>
  )
}
