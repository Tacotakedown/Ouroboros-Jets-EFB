export enum E_FrequencyTypes {
  WEATHER_AND_ADVISORY = 'WEATHER AND ADVISORY',
  CLEARANCE_DELIVERY = 'CLEARANCE DELIVERY',
  GROUND_CONTROL = 'GROUND CONTROL',
  TOWER = 'TOWER',
  COMMON = 'COMMON',
  APPROACH_DEPARTURE = 'APPROACH/DEPARTURE',
  EMERGENCY = 'EMERGENCY'
}

export const getStringFromFreqType = (type: E_FrequencyTypes): string => {
  switch (type) {
    case E_FrequencyTypes.WEATHER_AND_ADVISORY:
      return 'Weather and Advisory'
    case E_FrequencyTypes.CLEARANCE_DELIVERY:
      return 'Clearance'
    case E_FrequencyTypes.GROUND_CONTROL:
      return 'Ground'
    case E_FrequencyTypes.TOWER:
      return 'Tower'
    case E_FrequencyTypes.COMMON:
      return 'Commom'
    case E_FrequencyTypes.APPROACH_DEPARTURE:
      return 'Approach/Departure'
    case E_FrequencyTypes.EMERGENCY:
      return 'Emergency'
  }
}
