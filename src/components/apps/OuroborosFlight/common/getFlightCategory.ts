export const getFlightCategory = (
  cielings: { type: string; height: number },
  visibility: number
): { flightCategory: string; color: string } => {
  const isCieling = (): boolean => {
    if (cielings.type === 'BKN' || cielings.type === 'OVC') return true
    else return false
  }
  if (visibility < 1 || (isCieling() ? cielings.height < 500 : false)) {
    return { flightCategory: 'LIFR', color: '#ff5dad' }
  } else if (visibility < 3 || (isCieling() ? cielings.height < 1000 : false)) {
    return { flightCategory: 'IFR', color: '#ff0066' }
  } else if (visibility < 5 || (isCieling() ? cielings.height < 3000 : false)) {
    return { flightCategory: 'MVFR', color: '#2a9dff' }
  } else {
    return { flightCategory: 'VFR', color: '#00ffb4' }
  }
}
