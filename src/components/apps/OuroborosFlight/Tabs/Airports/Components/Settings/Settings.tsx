import React from 'react'
import { AppContext } from '../../../../../appRouter/appRouter'
import './Settings.scss'
import ToggleButton from 'react-toggle-button'

type T_SettingsProps = {
  open: boolean
  forceClose: any
}

export const Settings: React.FC<T_SettingsProps> = (props: T_SettingsProps): JSX.Element => {
  const useOutsideAlerter = (ref: any) => {
    React.useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          props.forceClose(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const { state, updateState } = React.useContext(AppContext)
  const setDarkMode = (darkMode: boolean): void => {
    updateState({
      ...state,
      state: {
        ouroborosFlight: {
          page: state?.ouroborosFlight.page,
          currentChart: state?.ouroborosFlight.currentChart,
          currentAirport: state?.ouroborosFlight.currentAirport,
          favorites: state?.ouroborosFlight.favorites,
          darkMode: darkMode,
          scratchpads: state?.ouroborosFlight.scratchpads,
          scratchpadSvg: state?.ouroborosFlight.scratchpadSvg
        },
        checklists: {
          currentChecklist: state?.checklists.currentChecklist,
          completedChecklists: state?.checklists.completedChecklists
        }
      }
    })
  }

  const wrapperRef = React.useRef(null)
  useOutsideAlerter(wrapperRef)
  if (props.open) {
    return (
      <div className="settings-background">
        <div ref={wrapperRef} className="settings-container">
          <div className="settings-header">
            <div
              onClick={() => {
                props.forceClose(false)
              }}
              className="settings-close-button"
            >
              X
            </div>
          </div>
          <div className="settings-content">
            <div className="settings-field">
              Dark mode pates
              <ToggleButton
                inactiveLabel={''}
                activeLabel={''}
                colors={{
                  activeThumb: {
                    base: 'rgb(250,250,250)'
                  },
                  inactiveThumb: {
                    base: 'rgb(62,130,247)'
                  },
                  active: {
                    base: 'rgb(207,221,245)',
                    hover: 'rgb(177, 191, 215)'
                  },
                  inactive: {
                    base: 'rgb(65,66,68)',
                    hover: 'rgb(95,96,98)'
                  }
                }}
                thumbAnimateRange={[0, 36]}
                value={state?.ouroborosFlight.darkMode}
                onToggle={() => {
                  setDarkMode(!state?.ouroborosFlight.darkMode)
                }}
              />
            </div>
            <div className="settings-field">Show only airports with acceptable runway lengths</div>
            <div className="settings-field">Sort nearest airports by:</div>
            <div className="settings-field">Sign out of Navigraph</div>
            <div className="settings-field">Reset all favorites</div>
          </div>
        </div>
      </div>
    )
  } else return <div></div>
}
