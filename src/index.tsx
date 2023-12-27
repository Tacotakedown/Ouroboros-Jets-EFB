import React from 'react'
import './index.scss'
import { Render } from './hooks/render'
import { EFBRouter } from './hooks/OsRouter'
import { DisplayProvider } from './components/OS/DisplayProvider/DisplayProvider'
import { HomeButton } from './components/OS/HomeButton/HomeButton'
import { AppRouter } from './components/apps/appRouter/appRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavigraphAuthProvider } from './hooks/useNavigraphAuth'

export const EFB = (): JSX.Element => {
  return (
    <NavigraphAuthProvider>
      <AppRouter>
        <EFBRouter>
          <div className="ipadContainer">
            <DisplayProvider />
            <ToastContainer
              position="top-left" // this can be top-center in the game, in the browser it will be top-left
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover
              theme="dark"
            />
            <HomeButton />
          </div>
        </EFBRouter>
      </AppRouter>
    </NavigraphAuthProvider>
  )
}

Render(<EFB />)
