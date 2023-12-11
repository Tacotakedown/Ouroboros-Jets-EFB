import React, { createContext, useState } from 'react'

type T_AppContextType = {
  ouroborosFlight: {
    page: number | undefined
    currentChart: string | undefined
    currentAirport: string | undefined
  }
}
const defaultAppContextValues: T_AppContextType = {
  ouroborosFlight: {
    page: 0,
    currentChart: 'a',
    currentAirport: 'KPHX'
  }
}

export type AppState = {
  state?: T_AppContextType
  updateState: (newState: Partial<AppState>) => void
}

const defaultState: AppState = {
  state: {
    ouroborosFlight: { page: 0, currentChart: 'a', currentAirport: 'KPHX' }
  },
  updateState: (newState?: Partial<AppState>) => {}
}

export const AppContext = createContext<AppState>(defaultState)

type T_AppRouterProps = {
  children: JSX.Element
}

export const AppRouter: React.FC<T_AppRouterProps> = (props: T_AppRouterProps): JSX.Element => {
  const [appState, setAppState] = useState<T_AppContextType>(defaultAppContextValues)

  const updateState = (newState: Partial<AppState>): void => {
    setAppState({ ...appState, ...newState })
  }

  return <AppContext.Provider value={{ ...appState, updateState }}>{props.children}</AppContext.Provider>
}
