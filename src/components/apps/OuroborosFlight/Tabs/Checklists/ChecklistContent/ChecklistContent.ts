type T_ContentType = {
  isDivider: boolean
  isNote: boolean
  isCaution: boolean
  content: string
}
export type T_ChecklistContent = {
  name: string
  Challenge: T_ContentType[]
  action: string[]
  performedBy: string[]
  isAnsweredBy: boolean // wording changes when in flight, we wanna be perfect
}
// going to make the type include a isDivider boolean so if isDivider is true for each content, then we will render a divider instead of the button

export const checklistContent: T_ChecklistContent[] = [
  // comments for my sanity when collapsed
  // internal safety inspection
  {
    name: 'Internal Safety Inspection',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'Maintenance Status' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Cockpit Emer Equip' },
      { isCaution: false, isNote: false, isDivider: false, content: 'ELECTRIC Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'FUEL Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'PASSENGER SIGNS Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Windshield Wiper 1 and 2 Knobs' },
      { isCaution: false, isNote: false, isDivider: false, content: 'HYDRAULIC Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'AIR COND/PNEUMATIC Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'PASSENGER OXYGEN Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'ELT Switch' },
      { isCaution: false, isNote: false, isDivider: false, content: 'LANDING GEAR Lever' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Engine 1 and 2 START/STOP Selectors' },
      { isCaution: false, isNote: false, isDivider: false, content: 'SPEEDBRAKE Lever' },
      { isCaution: false, isNote: false, isDivider: false, content: 'RAT MANUAL DEPLOY Lever' },
      { isCaution: false, isNote: false, isDivider: false, content: 'SLAT/FLAP Lever' },
      { isCaution: false, isNote: false, isDivider: false, content: 'CIRCUIT BREAKERS Panels' }
    ],
    action: [
      'CHECK',
      'CHECK',
      'SET',
      'CHECK',
      'AS REQUIRED',
      'OFF',
      'CHECK',
      'CHECK',
      'CHECK',
      'ARM',
      'DOWN',
      'STOP',
      'CLOSE',
      'STOW',
      'VERIFY POS',
      'CHECK'
    ],
    performedBy: [
      'LSP/RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP'
    ],
    isAnsweredBy: false
  },
  // power up
  {
    name: 'Power Up',
    Challenge: [
      {
        isCaution: false,
        isNote: true,
        isDivider: false,
        content: 'Ensure the airplane is not moved before the IESS is initialized'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'BATT 1 Knob'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'BATT 2 Knob'
      },
      {
        isCaution: true,
        isNote: false,
        isDivider: false,
        content:
          'VERIFY THAT ONLY DISPLAYS 2 AND 3 ARE AVAILABLE. IF MORE THAN DISPLAYS 2 AND 3 ARE AVAILABLE, THE AIRPLANE MUST NOT BE DISPATCHED'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Battery Voltage'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'EICAS Messages'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'GPU Button (if applicable)'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'EMER LT Selector'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'FIRE EXTINGUISHER Panel'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'APU CONTROL Panel'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'External Lights NAV Switch'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'HYDRAULIC Panel'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic CBs'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic Checklist (if applicable)'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'DVDR CONTROL Panel'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic Flight Bag (if applicable)'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'COCKPIT DOOR CONTROL Panel (if applicable)'
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Photoluminescent Strips'
      }
    ],
    action: [
      '',
      'ON',
      'AUTO',
      '',
      'CHECK',
      'CHECK DISPLAYED',
      'PUSH IN',
      'ON, THEN ARMED',
      'CHECK',
      'AS REQUIRED',
      'ON',
      'AS REQUIRED',
      'CHECK',
      'CHECK',
      'CHECK',
      'ON',
      'CHECK',
      'CHECK'
    ],
    performedBy: [
      '',
      'RSP',
      'RSP',
      '',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'LSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP'
    ],
    isAnsweredBy: false
  },
  // before start
  {
    name: 'Before Start',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'PASSENGER SIGNS Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'PRESSURIZATION Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Oxygen Masks' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Flight Instruments' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Thrust Levers' },
      { isCaution: false, isNote: false, isDivider: true, content: '' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Fuel Quantity' },
      { isCaution: false, isNote: false, isDivider: false, content: 'MCDU' },
      { isCaution: false, isNote: false, isDivider: false, content: 'TRIM Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Doors and Windows' },
      { isCaution: false, isNote: false, isDivider: false, content: 'External Lights RED BCN Switch' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Emergency/Parking Brake' }
    ],
    action: [
      'SET',
      'SET',
      'CHECKED',
      'X-CHECKED',
      'IDLE',
      '',
      'CHECKED',
      'SET',
      'SET/ZERO/ZERO',
      'CLOSED',
      'ON',
      'AS REQUIRED'
    ],
    performedBy: ['LSP', 'LSP', 'LSP/RSP', 'LSP', 'LSP', '', 'LSP/RSP', 'LSP', 'LSP', 'LSP/RSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // After Start
  {
    name: 'After Start',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'Ground Equipment' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Slat/Flap' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Flight Controls' }
    ],
    action: ['REMOVED', 'SET', 'CHECKED'],
    performedBy: ['LSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // Before Takeoff
  {
    name: 'Before Takeoff',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'Brakes Temperature' },
      { isCaution: false, isNote: false, isDivider: false, content: 'EICAS' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Transponder' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Takeoff Configuration' }
    ],
    action: ['CHECKED', 'CHECKED', 'TA/RA', 'CHECKED'],
    performedBy: ['LSP', 'LSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // After Takeoff
  {
    name: 'After Takeoff',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'Landing Gear' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Slat/Flap' }
    ],
    action: ['UP', '0'],
    performedBy: ['PM', 'PM'],
    isAnsweredBy: true
  },
  // Approach
  {
    name: 'Approach',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'PASSANGER SIGNS Pannel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Altimeters' }
    ],
    action: ['SET', 'SET/X-CHECKED'],
    performedBy: ['PM', 'PF/PM'],
    isAnsweredBy: true
  },
  // Before Landing
  {
    name: 'Before Landing',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'Landing Gear' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Slat/Flap' }
    ],
    action: ['DOWN', 'SET'],
    performedBy: ['PF/PM', 'PF/PM'],
    isAnsweredBy: true
  },
  // Shutdown
  {
    name: 'Shutdown',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'Emergency/Parking Brake' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Engine 1 and 2 START/STOP Selectors' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Hydraulic Sys 3 ELEC PUMP A Knob' }
    ],
    action: ['APPLY', 'STOP', 'OFF'],
    performedBy: ['LSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // Leaving the Airplane
  {
    name: 'Leaving the Airplane',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'PASSENGER SIGNS Panel' },
      { isCaution: false, isNote: false, isDivider: false, content: 'Electronic Flight Bag (if applicable)' },
      { isCaution: false, isNote: false, isDivider: false, content: 'HGS Combiner Cover (if applicable)' },
      { isCaution: false, isNote: false, isDivider: false, content: 'APU MASTER Selector' },
      { isCaution: false, isNote: false, isDivider: false, content: 'GPU Button (if available)' },
      { isCaution: false, isNote: false, isDivider: false, content: 'BATT 1 and BATT 2 Knobs' }
    ],
    action: ['OFF', 'OFF', 'SET', 'OFF', 'PUSH OUT', 'OFF'],
    performedBy: ['RSP', 'LSP & RSP', 'LSP & RSP', 'RSP', 'RSP', 'RSP'],
    isAnsweredBy: true
  }
]
