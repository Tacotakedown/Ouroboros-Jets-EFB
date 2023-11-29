import React from 'react'
import ReactDOM from 'react-dom/client'

export const Render = (app: JSX.Element): void => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(<React.StrictMode>{app}</React.StrictMode>)
}
