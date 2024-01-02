import React, { useState, useEffect, useContext, createContext } from 'react'
import { type User } from 'navigraph/auth'
import { auth } from '../NavigraphApi/Navigraph'

type NavigraphAuthContext = {
  isInitialized: boolean
  user: User | null
  signIn: typeof auth.signInWithDeviceFlow
  signOut: typeof auth.signOut
}

const authContext = createContext<NavigraphAuthContext>({
  isInitialized: false,
  user: null,
  signIn: () => Promise.reject('Not initialized'),
  signOut: () => Promise.reject('Not initialized')
})

// Provider component that wraps your app and makes the authentication state
// available to any child component that calls useAuth().
export const NavigraphAuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to access the authentication state
export const useNavigraphAuth = (): NavigraphAuthContext => useContext(authContext)

// Provider hook that creates auth object and handles state
const useProvideAuth = (): any => {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Subscribe to user changes on mount
  // Whenever a user is signed in or out, this hook will respond to the change.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u)
      setIsInitialized(true)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return {
    user,
    isInitialized,
    signIn: auth.signInWithDeviceFlow,
    signOut: auth.signOut
  }
}
