export type T_ChallengeDetails = {
  type: 'ChallengeDetails'
  detailsChallenge: string[]
  detailsResponse: string[]
}
export type T_ChallengeTitleBullets = {
  type: 'ChallengeTitleBullets'
  title: string
  bullets: string[]
}
export type T_StringArray = {
  type: 'StringArray'
  items: string[]
}

export type T_String = {
  type: 'String'
  value: string
}

type T_ContentType = {
  isDivider: boolean
  isNote: boolean
  isCaution: boolean
  content: string
  details: T_ChallengeDetails | T_ChallengeTitleBullets | T_StringArray | T_String | null // the SOP has them as either a checklist, bullet points, outright string list | string, or just nothing
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
      { isCaution: false, isNote: false, isDivider: false, content: 'Maintenance Status', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Cockpit Emer Equip',
        details: {
          type: 'ChallengeTitleBullets',
          title: 'Check for the availability, status and proper location of the following equipment:',
          bullets: [
            'Protective Breathing Equipment (PBE).',
            'Fire Extinguisher.',
            'Crash Axe.',
            'Life Vests.',
            'Escape Ropes.',
            'Flashlights.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'ELECTRIC Panel',
        details: {
          type: 'ChallengeDetails',
          detailsChallenge: [
            'IDG 1 Selector',
            'IDG 2 Selector',
            'GPU Button',
            'AC BUS TIES Selector',
            'APU GEN Button',
            'TRU 1 Switch',
            'TRU ESS Switch',
            'TRU 2 Switch',
            'BATT 1 Knob',
            'DC BUS TIES Switch',
            'BATT 2 Knob'
          ],
          detailsResponse: [
            'AUTO',
            'AUTO',
            'PUSHED OUT',
            'AUTO',
            'PUSHED IN',
            'AUTO',
            'AUTO',
            'AUTO',
            'OFF',
            'AUTO',
            'OFF'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'FUEL Panel',
        details: {
          type: 'String',
          value: 'Verify all fuel pump knobs in AUTO position and XFEED Selector in the OFF position'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'PASSENGER SIGNS Panel',
        details: {
          type: 'String',
          value:
            'For ANAC and FAA airplanes without ashtrays on the passenger seats, the No Smoke sign must be set at ON during all flight phases.'
        }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'Windshield Wiper 1 and 2 Knobs', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'HYDRAULIC Panel',
        details: {
          type: 'ChallengeDetails',
          detailsChallenge: [
            'Hydraulic Sys 1 ENG PUMP SHUTOFF Button',
            'PTU Knob',
            'Hydraulic Sys 2 ENG PUMP SHUTOFF Button',
            'Hydraulic Sys 1 ELEC PUMP Knob',
            'Hydraulic Sys 2 ELEC PUMP Knob',
            'Hydraulic Sys 3 ELEC PUMP A Knob',
            'Hydraulic Sys 3 ELEC PUMP B Knob'
          ],
          detailsResponse: ['PUSH OUT', 'AUTO', 'PUSH OUT', 'AUTO', 'AUTO', 'OFF', 'AUTO']
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'AIR COND/PNEUMATIC Panel',
        details: { type: 'String', value: 'Verify all buttons PUSHED IN.' }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'PASSENGER OXYGEN Panel',
        details: { type: 'String', value: 'Verify Masks Deploy Selector in AUTO.' }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'ELT Switch', details: null },
      { isCaution: false, isNote: false, isDivider: false, content: 'LANDING GEAR Lever', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Engine 1 and 2 START/STOP Selectors',
        details: null
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'SPEEDBRAKE Lever', details: null },
      { isCaution: false, isNote: false, isDivider: false, content: 'RAT MANUAL DEPLOY Lever', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'SLAT/FLAP Lever',
        details: {
          type: 'String',
          value: 'Verify that the current SLAT/FLAP Lever position agrees with the surface position.'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'CIRCUIT BREAKERS Panels',
        details: { type: 'String', value: 'Verify both sidewall panels to ensure agreement with maintenance status.' }
      }
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
        content: 'Ensure the airplane is not moved before the IESS is initialized',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'BATT 1 Knob',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'BATT 2 Knob',
        details: null
      },
      {
        isCaution: true,
        isNote: false,
        isDivider: false,
        content:
          'VERIFY THAT ONLY DISPLAYS 2 AND 3 ARE AVAILABLE. IF MORE THAN DISPLAYS 2 AND 3 ARE AVAILABLE, THE AIRPLANE MUST NOT BE DISPATCHED',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Battery Voltage',
        details: {
          type: 'ChallengeTitleBullets',
          title:
            'Verify batteries voltage at or above 22 V. If batteries voltage is between 21 V and 22 V, recharge the batteries prior to takeoff, through any AC source (including engines during taxi) for:',
          bullets: [
            '30 minutes if batteries temperature is at or above 0oC, or',
            '35 minutes if batteries temperature is at or above -5oC and below 0oC, or',
            '40 minutes if batteries temperature is at or above -10oC and below -5oC, or',
            '50 minutes if batteries temperature is below -10oC. If batteries voltage is below 21 V, report to maintenance.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'EICAS Messages',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'GPU Button (if applicable)',
        details: {
          type: 'String',
          value:
            'Verify AVAIL light illuminated before pushing in. When GPU is not available, or is not necessary, maintain GPU Button pushed out'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'EMER LT Selector',
        details: {
          type: 'String',
          value: 'ON: Verify the EMER LT ON and EMER LT NOT ARMED messages displayed on the EICAS then ARM'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'FIRE EXTINGUISHER Panel',
        details: {
          type: 'ChallengeTitleBullets',
          title:
            'Verify there are no fire protection fail messages displayed on the EICAS after Power Up. Press and hold the Fire Extinguisher TEST button and observe the following EICAS messages, lights and warnings:',
          bullets: [
            'Aural warning',
            'FIRE EXTINGUISHER Handles illuminated',
            'Cargo Smoke AFT Button illuminated',
            'Cargo Smoke FWD Button illuminated',
            'Fire Extinguisher APU Button illuminated',
            'Upper half of the APU EMER STOP Button illuminated',
            'WARNING lights flashing',
            'CARGO AFT SMOKE EICAS message',
            'CARGO FWD SMOKE EICAS message',
            'APU FIRE EICAS message',
            'ENG 1 FIRE EICAS message',
            'ENG 2 FIRE EICAS message, and',
            'FIRE warning annunciation displayed inside ITT indicators.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'APU CONTROL Panel',
        details: {
          type: 'StringArray',
          items: [
            'Verify APU EMER STOP Button is PUSHED OUT and not illuminated.',
            'The APU FADEC is ready for use when APU rpm and EGT dashed indications (--) are replaced by numbers.',
            'If GPU power is not AVAIL on ELECTRIC panel, the APU GEN OFF BUS message may be displayed. The message should disappear after APU start'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'External Lights NAV Switch',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'HYDRAULIC Panel',
        details: {
          type: 'ChallengeTitleBullets',
          title:
            'If the electrical PBIT is completed and the FLT CTRL BIT EXPIRED message is displayed, perform the hydraulic PBIT.',
          bullets: [
            'Do not move any flight control surface.',
            'Turn the Hydraulic Sys 1 ELEC PUMP Knob to ON',
            'Turn the Hydraulic Sys 2 ELEC PUMP Knob to ON',
            'Turn the Hydraulic Sys 3 ELEC PUMP A Knob to ON ',
            'Wait 1 minute. At this point the FLT CTRL BIT EXPIRED EICAS message should extinguish.',
            'Turn the Hydraulic Sys 1 ELEC PUMP Knob to AUTO.',
            'Turn the Hydraulic Sys 2 ELEC PUMP Knob to AUTO.',
            'Turn the Hydraulic Sys 3 ELEC PUMP A Knob to OFF. '
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic CBs',
        details: {
          type: 'StringArray',
          items: [
            'Select CB OUT/LOCK page on MCDU and check the CBs status to ensure agreement with maintenance status.',
            'If the NEW TRIP prompt is displayed on the MCDU press it to check the electronic CBs status.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic Checklist (if applicable)',
        details: {
          type: 'String',
          value: 'Verify that this ECL database corresponds to the paper QRH revision present in the cockpit'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'DVDR CONTROL Panel',
        details: {
          type: 'StringArray',
          items: [
            'Honeywell or L3 DVDR: Press and hold TEST Button for three seconds and verify no fail messages displayed on EICAS.',
            'Universal DVDR: Press and hold TEST button for two seconds. Verify no fail messages displayed on EICAS and observe the following test result:',
            'The FDR 1 and CVR 1 PASS/FAIL lights flash during ten seconds. After ten seconds the FDR 1 and CVR 1 PASS/FAIL lights illuminate steady in green, indicating the completion of a successful test.',
            'After the DVDR 1 test finishes, the DVDR 2 test will automatically start. Verify the following test result:',
            'The FDR 2 and CVR 2 PASS/FAIL lights flash during ten seconds. After ten seconds the FDR 2 and CVR 2 PASS/FAIL lights illuminate steady in green, indicating the completion of a successful test.',
            'If a failure is found, the corresponding FDR/CVR fail light',
            'indicator will illuminate steady in amber.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic Flight Bag (if applicable)',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'COCKPIT DOOR CONTROL Panel (if applicable)',
        details: {
          type: 'StringArray',
          items: [
            'Close the cockpit door.',
            'Press and hold the TEST button.',
            'Check DING-DONG alarm and UNLOCKED indication ON.',
            'Push in the LOCK Button and check the electromechanical latch normal operation.',
            'Push out the LOCK Button'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Photoluminescent Strips',
        details: {
          type: 'String',
          value:
            'Check in the AOM section 3-05 how much time of ceiling and entrance lighting exposure in bright would be necessary to charge the photoluminescent strips'
        }
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
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'ELECTRIC Panel',
        details: {
          type: 'ChallengeDetails',
          detailsChallenge: [
            'IDG 1 Selector',
            'IDG 2 Selector',
            'GPU Button',
            'AC BUS TIES Selector',
            'APU GEN Button',
            'TRU 1 Switch',
            'TRU ESS Switch',
            'TRU 2 Switch',
            'BATT 1 Knob',
            'DC BUS TIES Switch',
            'BATT 2 Knob'
          ],
          detailsResponse: [
            'AUTO',
            'AUTO',
            'AS REQUIRED',
            'AUTO',
            'PUSHED IN',
            'AUTO',
            'AUTO',
            'AUTO',
            'ON',
            'AUTO',
            'AUTO'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'COCKPIT LIGHTS Panel',
        details: {
          type: 'StringArray',
          items: [
            'Adjust MAIN PNL, OVHD PNL and PEDESTAL lights.',
            'Push ANNUCIATORS TEST Button and verify all associated lights.',
            'Set DOME light AS REQUIRED'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'FUEL Panel',
        details: {
          type: 'StringArray',
          items: [
            'XFEED Selector AS REQUIRED.',
            'DC PUMP Knob to AUTO.',
            'Fuel AC PUMP 1 Knob to AUTO.',
            'Fuel AC PUMP 2 Knob to AUTO.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'PASSENGER SIGNS Panel',
        details: {
          type: 'StringArray',
          items: [
            'STERILE Switch AS REQUIRED.',
            'Turn NO SMKG/NO ELEC DEVICES Switch to ON.',
            'Turn FSTN BELTS Switch to ON after finishing refueling the airplane'
          ]
        }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'EXTERNAL LIGHTS Panel', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'PRESSURIZATION Panel',
        details: {
          type: 'StringArray',
          items: [
            'CABIN ALT Controller to STOP,',
            'Pressurization MODE Selector to AUTO,',
            'DUMP Button PUSHED OUT, guarded and not illuminated,',
            'LFE Controller to STOP. '
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Oxygen Masks',
        details: {
          type: 'StringArray',
          items: [
            'Check masks for supply of oxygen and for microphone functionality.',
            'The MFD STATUS page must be checked and the available oxygen supply and pressure must be adequate for use.',
            'Carry out the test as follows:',
            'Set the Oxygen Supply Knob to “100%”.',
            'Press and hold the “TEST/RESET” Button.',
            'Verify a short illumination or “blink” of the flow indicator.',
            'Verify audible oxygen flow in the headset or loudspeakers.',
            'Once the mask fully pressurizes the indicator must go out, showing that the system is leak free.',
            'Release the “TEST/RESET” Button. '
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Flight Instruments',
        details: {
          type: 'ChallengeTitleBullets',
          title: 'Verify:',
          bullets: [
            'Airspeed tapes not showing speed.',
            'Set altimeter setting and crosscheck it with the field elevation.',
            'EADIs leveled and flag-free.',
            'Initial assigned altitude on the ALT SEL Controller.',
            'Crosscheck the altitude tape indications.',
            'Both VSIs showing zero.',
            'EHSIs with the courses selected according to the intended departure procedure and NAV source selected.',
            'For LVTO using the HGS set the CDI to the runway course.',
            'EHSIs and magnetic compass flag free and showing the same magnetic heading.',
            'HDG bug set according to the proposed departure procedure.',
            'Check IESS and adjust the altimeter setting.',
            'Weather set on PFD and/or MFDs MAP page as required.',
            'It is recommended that PM sets the Terrain on MFD up to MSA.',
            'Set the MFDs MAP page menu as required.',
            'TCAS should be always displayed on both MFDs'
          ]
        }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'Thrust Levers', details: null },
      { isCaution: false, isNote: false, isDivider: true, content: '', details: null },
      { isCaution: false, isNote: false, isDivider: false, content: 'Fuel Quantity', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'MCDU',
        details: {
          type: 'ChallengeTitleBullets',
          title:
            'The initialization flow is done using always LSK 6R to travel throughout the pages and fill all the necessary information accordingly.',
          bullets: [
            'In case of FMS AUTOTUNE OFF takeoff is selected in order to hard-tune a specific VOR, return to FMS AUTOTUNE ON as soon as the VOR frequency is no longer necessary;',
            'Select NAV IDENT page and check its contents;',
            'On the RTE page it is necessary to set the destination, alternate, FLIGHT ID and follow the 6R key to add the Departure procedure. After add airways (VIA) or waypoints (TO) according to the flight plan release. Both pilots should check course, distance, time, altitude on each waypoint and LFE in the EICAS according to the destination landing field elevation. PERF INIT is next;',
            'It is recommended to set page PERF INIT pages 1/3, 2/3 and check/set its contents. If ALTN FUEL on page 1/3 is entered, FMS disregards the trip fuel from the destination to the alternate and uses the figures entered on its field. If it is already available, enter the ZFW and TO CG on page 2/3. There is no need to confirm the Performance Initialization. Set or verify the CLIMB, CRUISE, DESCENT speed schedule on PERF INIT page 3/3;',
            'If all performance data is to be entered, complete the Takeoff Dataset, Takeoff Init, Takeoff Speeds and Dep Lim pages. Otherwise do it shortly before start up.',
            'If applicable select MENU HGS page and set the COMBINER MODE;',
            'If applicable (ETOPS configuration), select ETOPS or non ETOPS flight on MENU → MISC MENU → OPR CONFIG Page;',
            'If applicable (AUTOLAND configuration), select enableor disable on MENU → MISC MENU → OPR CONFIG page.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'TRIM Panel',
        details: {
          type: 'String',
          value:
            'Verify that ROLL TRIM Switch, YAW Trim Controller and PITCH TRIM Switches (Captain, First Officer and BACKUP) are operating properly both ways and check that position indication on EICAS changes accordingly. Verify system’s 3 second protection working properly. Adjust YAW and ROLL trims to the neutral position and PITCH trim to the green band.'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Doors and Windows',
        details: {
          type: 'String',
          value:
            'Both pilots must verify that their respective cockpit window is closed and the RSP should select MFD status page to check all airplane doors closed indications. It is recommended to assure that escape slides are armed. Check the cockpit door securely closed'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'External Lights RED BCN Switch',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Emergency/Parking Brake',
        details: {
          type: 'String',
          value: 'Verify if the Emergency/Parking Brake is set in accordance with the engine start procedures.'
        }
      }
    ],
    action: [
      'SET',
      'AS REQUIRED',
      'SET',
      'SET',
      'AS REQUIRED',
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
    performedBy: [
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'RSP',
      'LSP',
      'LSP/RSP',
      'LSP',
      'LSP',
      '',
      'LSP/RSP',
      'LSP',
      'LSP',
      'LSP/RSP',
      'LSP',
      'LSP'
    ],
    isAnsweredBy: true
  },
  // After Start
  {
    name: 'After Start',
    Challenge: [
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Ground Equipment',
        details: {
          type: 'String',
          value:
            'Captain must be sure that the Emergency/Parking Brake is set, nose landing gear/RAT pins and ground equipment have been removed.'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Slat/Flap',
        details: {
          type: 'String',
          value:
            'Adjust Slat/Flap to a setting consistent with the intended takeoff configuration and performance. If the Slat/Flap setting is different from the input made on TAKEOFF page of the FMS the aural message “NO TAKEOFF FLAP” will sound during the takeoff configuration check. '
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Flight Controls',
        details: {
          type: 'StringArray',
          items: [
            'Press the Steer DISENGAGE Switch',
            'Check the control column and rudder pedals',
            'Flight controls should be checked for freedom of movement in a smooth and continuous manner.',
            'A full green box indication on the synoptic page is not a requirement for a successful check.',
            'LSP selects FLTCTRL Synoptic page,',
            'Elevator - full up, neutral, full down and neutral,',
            'Aileron - full left, neutral, full right and neutral,',
            'Rudder - full left, neutral, full right and neutral.',
            'Press the NOSEWHEEL STEERING Handle until STEER OFF Status message extinguishes to engage the STEERING and select MAP on the MFD prior to start the taxi.'
          ]
        }
      }
    ],
    action: ['REMOVED', 'SET', 'CHECKED'],
    performedBy: ['LSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // Before Takeoff
  {
    name: 'Before Takeoff',
    Challenge: [
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Brakes Temperature',
        details: {
          type: 'String',
          value:
            'Brakes temperature indication must be in the green range for takeoff. Following that, the RSP should select MAP on MFD'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'EICAS',
        details: {
          type: 'String',
          value:
            'No EICAS messages displayed or only EICAS advisory and status messages related to a given airplane configuration resulted by crew action should be displayed'
        }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'Transponder', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Takeoff Configuration',
        details: {
          type: 'String',
          value: 'Press the T/O CONFIG button and “TAKEOFF OK” synthetic message shall be heard.'
        }
      }
    ],
    action: ['CHECKED', 'CHECKED', 'TA/RA', 'CHECKED'],
    performedBy: ['LSP', 'LSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // After Takeoff
  {
    name: 'After Takeoff',
    Challenge: [
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Landing Gear',
        details: {
          type: 'String',
          value:
            'PM positions the LANDING GEAR Lever up after PF has requested and confirms the three white UP indications on the EICAS.'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Slat/Flap',
        details: {
          type: 'String',
          value: 'PM retracts Slat/Flap following the F-Bug reference.'
        }
      }
    ],
    action: ['UP', '0'],
    performedBy: ['PM', 'PM'],
    isAnsweredBy: true
  },
  // Approach
  {
    name: 'Approach',
    Challenge: [
      { isCaution: false, isNote: false, isDivider: false, content: 'PASSANGER SIGNS Pannel', details: null },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Altimeters',
        details: {
          type: 'String',
          value:
            'Transition Level is automatically retrieved from the navigation database and is displayed on DESCENT page'
        }
      }
    ],
    action: ['SET', 'SET/X-CHECKED'],
    performedBy: ['PM', 'PF/PM'],
    isAnsweredBy: true
  },
  // Before Landing
  {
    name: 'Before Landing',
    Challenge: [
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Landing Gear',
        details: {
          type: 'String',
          value: 'PM positions the LANDING GEAR Lever DN when requested by the PF'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Slat/Flap',
        details: {
          type: 'String',
          value: 'PM selects Slat/Flap Lever as directed by the PF'
        }
      }
    ],
    action: ['DOWN', 'SET'],
    performedBy: ['PF/PM', 'PF/PM'],
    isAnsweredBy: true
  },
  // Shutdown
  {
    name: 'Shutdown',
    Challenge: [
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Emergency/Parking Brake',
        details: {
          type: 'StringArray',
          items: [
            'Apply the Emergency/Parking Brake after the airplane has stopped. Make sure that the airplane is static before doing so.',
            'Verify brake temperature. If close to the cautionary range, verify that chocks are on and release the Emergency/Parking Brake to reduce the brake cooling time.'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Engine 1 and 2 START/STOP Selectors',
        details: {
          type: 'String',
          value:
            'The engines will not shut down with START/STOP Selectors unless Thrust Levers are first moved to IDLE. If STOP is selected before Thrust Lever is retarded to IDLE, momentarily cycle START/STOP Selector to RUN and back to STOP.'
        }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'Hydraulic Sys 3 ELEC PUMP A Knob', details: null },
      { isCaution: false, isNote: false, isDivider: false, content: 'External Lights RED BCN Switch', details: null },
      { isCaution: false, isNote: false, isDivider: false, content: 'FSTN BELTS Switch', details: null }
    ],
    action: ['APPLY', 'STOP', 'OFF', 'OFF', 'OFF'],
    performedBy: ['LSP', 'LSP', 'LSP', 'LSP', 'LSP'],
    isAnsweredBy: true
  },
  // Leaving the Airplane
  {
    name: 'Leaving the Airplane',
    Challenge: [
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'PASSENGER SIGNS Panel',
        details: {
          type: 'String',
          value: 'Set the EMER LT Selector and all switches to OFF'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'Electronic Flight Bag (if applicable)',
        details: null
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'HGS Combiner Cover (if applicable)',
        details: {
          type: 'String',
          value: 'The LSP (and the RSP - dual HGS installation) must cover the respective combiner.'
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'APU MASTER Selector',
        details: {
          type: 'StringArray',
          items: [
            'Turn the APU MASTER Selector to OFF. Wait until the APU shuts down and the label OFF displayed on the EICAS.',
            'Wait additional 80 seconds until APU FUEL SOV CLOSED is momentarily displayed'
          ]
        }
      },
      {
        isCaution: false,
        isNote: false,
        isDivider: false,
        content: 'GPU Button (if available)',
        details: {
          type: 'String',
          value: 'If only GPU is available, push out the GPU Button'
        }
      },
      { isCaution: false, isNote: false, isDivider: false, content: 'BATT 1 and BATT 2 Knobs', details: null }
    ],
    action: ['OFF', 'OFF', 'SET', 'OFF', 'PUSH OUT', 'OFF'],
    performedBy: ['RSP', 'LSP & RSP', 'LSP & RSP', 'RSP', 'RSP', 'RSP'],
    isAnsweredBy: true
  }
]
