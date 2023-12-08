/**
 * we will generate a bootleg home button to work with browser while debugging
 */
import React from 'react'
import './HomeButton.scss'
import { LoadContext, OsRouterContext, UseNaigate } from '../../../hooks/OsRouter'

export const HomeButton = (): JSX.Element => {
  const OSRouter = LoadContext(OsRouterContext)
  return (
    <div
      className="home-button-debug"
      onClick={() => {
        UseNaigate(OSRouter, 0)
      }}
    >
      <div>HOME</div>
    </div>
  )
}
