import React, { useEffect } from 'react'
import { type FAASource, type NavigraphRasterSource, type NavigraphTheme, NavigraphTileLayer } from '@navigraph/leaflet'
import { Map } from 'leaflet'
// import { useNavigraphAuth } from '../hooks/useNavigraphAuth'
import { auth } from './Navigraph'
// import { getAuth } from 'navigraph/auth'
import 'leaflet/dist/leaflet.css'
import './map.scss'

export const NgMap = (): JSX.Element => {
  // const { user, isInitialized, signIn, signOut } = useNavigraphAuth()
  const initializeMap = (): (() => void) => {
    // Instantiate a Leaflet map and set view to Sweden
    const map = new Map('map').setView([59.334591, 18.06324], 5)

    const ngLayer = new NavigraphTileLayer(auth).addTo(map)

    // Cleanup event listeners when component unmounts
    return () => {
      ngLayer.remove()
      map.remove()
    }
  }

  const handleSourceButtonClick = (source: NavigraphRasterSource): void => {
    // Your logic for handling source button click
  }

  const handleFAASourceButtonClick = (source: FAASource): void => {
    // Your logic for handling FAA source button click
  }

  const handleThemeButtonClick = (theme: NavigraphTheme): void => {
    // Your logic for handling theme button click
  }

  const handleSignInButtonClick = (): void => {
    auth.signInWithDeviceFlow((params) => window.open(params.verification_uri_complete, '_blank')).catch(console.error)
  }

  useEffect(() => {
    if (auth.getUser()?.preferred_username === null) return
    const cleanupMap = initializeMap()
    console.log('updated user')
    // Clean up map when component unmounts
    return () => {
      cleanupMap()
    }
  }, [auth.getUser()?.preferred_username]) // Empty dependency array ensures the effect runs once after initial render

  return (
    <div>
      <div id="map" style={{ height: '900px' }}></div>
      <div>{auth.getUser()?.preferred_username}</div>
      <div className="sources">
        <button
          onClick={() => {
            handleSourceButtonClick('VFR')
          }}
        >
          VFR
        </button>
        <button
          onClick={() => {
            handleSourceButtonClick('IFR LOW')
          }}
        >
          Source 2
        </button>
      </div>
      <div className="faa-sources">
        <button
          onClick={() => {
            handleFAASourceButtonClick('VFR')
          }}
        >
          FAA Source 1
        </button>
        <button
          onClick={() => {
            handleFAASourceButtonClick('IFR LOW')
          }}
        >
          FAA Source 2
        </button>
        {/* Add more FAA source buttons as needed */}
      </div>
      <div className="themes">
        <button
          onClick={() => {
            handleThemeButtonClick('DAY')
          }}
        >
          day
        </button>
        <button
          onClick={() => {
            handleThemeButtonClick('NIGHT')
          }}
        >
          night
        </button>
        {/* Add more theme buttons as needed */}
      </div>
      {auth.getUser() !== null ? (
        ''
      ) : (
        <div id="signin" onClick={handleSignInButtonClick}>
          Sign In
        </div>
      )}
    </div>
  )
}
