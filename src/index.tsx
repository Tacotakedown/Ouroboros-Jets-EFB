import React from 'react'
import './index.scss'
import { Render } from './hooks/render'
import { EFBRouter } from './hooks/OsRouter'
import { DisplayProvider } from './components/OS/DisplayProvider/DisplayProvider'
import { HomeButton } from './components/OS/HomeButton/HomeButton'
import { AppRouter } from './components/apps/appRouter/appRouter'

export const EFB = (): JSX.Element => {
  return (
    <AppRouter>
      <EFBRouter>
        <div className="ipadContainer">
          <DisplayProvider />
          <HomeButton />
        </div>
      </EFBRouter>
    </AppRouter>
  )
}

Render(<EFB />)
