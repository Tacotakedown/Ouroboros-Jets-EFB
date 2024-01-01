import arms from './arms.json'

export const getMoment = (weight: number, arm: number): number => {
  return weight * arm
}
export const getCg = (weight: number, moment: number): number => {
  return moment / weight
}
export const getMAC = (arm: number): number => {
  return ((arm - 508.858) * 100) / 125.748
}
export const getFuelWeight = (fuel: number): number => {
  return fuel * 6.767
}

export const getFuelCG = (fuel: number): number => {
  switch (Math.round(fuel / 50) * 50) {
    case 0:
      return arms.fuelArms['0g']
    case 50:
      return arms.fuelArms['50']
    case 100:
      return arms.fuelArms['100']
    case 150:
      return arms.fuelArms['150']
    case 200:
      return arms.fuelArms['200']
    case 250:
      return arms.fuelArms['250']
    case 300:
      return arms.fuelArms['300']
    case 350:
      return arms.fuelArms['350']
    case 400:
      return arms.fuelArms['400']
    case 450:
      return arms.fuelArms['450']
    case 500:
      return arms.fuelArms['500']
    case 550:
      return arms.fuelArms['550']
    case 600:
      return arms.fuelArms['600']
    case 650:
      return arms.fuelArms['650']
    case 700:
      return arms.fuelArms['700']
    case 750:
      return arms.fuelArms['750']
    case 800:
      return arms.fuelArms['800']
    case 850:
      return arms.fuelArms['850']
    case 900:
      return arms.fuelArms['900']
    case 950:
      return arms.fuelArms['950']
    case 1000:
      return arms.fuelArms['1000']
    case 1050:
      return arms.fuelArms['1050']
    case 1100:
      return arms.fuelArms['1100']
    case 1150:
      return arms.fuelArms['1150']
    case 1200:
      return arms.fuelArms['1200']
    case 1250:
      return arms.fuelArms['1250']
    case 1300:
      return arms.fuelArms['1300']
    case 1350:
      return arms.fuelArms['1350']
    case 1400:
      return arms.fuelArms['1400']
    case 1450:
      return arms.fuelArms['1450']
    case 1500:
      return arms.fuelArms['1500']
    case 1550:
      return arms.fuelArms['1550']
    case 1600:
      return arms.fuelArms['1600']
    case 1650:
      return arms.fuelArms['1650']
    case 1700:
      return arms.fuelArms['1700']
    case 1750:
      return arms.fuelArms['1750']
    case 1800:
      return arms.fuelArms['1800']
    case 1850:
      return arms.fuelArms['1850']
    case 1900:
      return arms.fuelArms['1900']
    case 1950:
      return arms.fuelArms['1950']
    case 2000:
      return arms.fuelArms['2000']
    case 2050:
      return arms.fuelArms['2050']
    case 2100:
      return arms.fuelArms['2100']
    case 2150:
      return arms.fuelArms['2150']
    case 2200:
      return arms.fuelArms['2200']
    case 2250:
      return arms.fuelArms['2250']
    case 2300:
      return arms.fuelArms['2300']
    case 2350:
      return arms.fuelArms['2350']
    case 2400:
      return arms.fuelArms['2400']
    case 2450:
      return arms.fuelArms['2450']
    case 2500:
      return arms.fuelArms['2500']
    case 2550:
      return arms.fuelArms['2550']
    case 2600:
      return arms.fuelArms['2600']
    case 2650:
      return arms.fuelArms['2650']
    case 2700:
      return arms.fuelArms['2700']
    case 2750:
      return arms.fuelArms['2750']
    case 2800:
      return arms.fuelArms['2800']
    case 2850:
      return arms.fuelArms['2850']
    case 2900:
      return arms.fuelArms['2900']
    case 2950:
      return arms.fuelArms['2950']
    case 3000:
      return arms.fuelArms['3000']
    case 3050:
      return arms.fuelArms['3050']
    case 3100:
      return arms.fuelArms['3071']
    default:
      return arms.fuelArms['0g']
  }
}
export const getPsgrWeight = (passangers: number): number => {
  // returns weight for given passanger number
  return passangers * 190
}
export const getPsgrMoment = (passangers: number): number => {
  // returns moment for a given passanger number
  switch (passangers) {
    case 0:
      return 0
    case 1:
      return arms.pasMoment['1']
    case 2:
      return arms.pasMoment['2']
    case 3:
      return arms.pasMoment['3']
    case 4:
      return arms.pasMoment['4']
    case 5:
      return arms.pasMoment['5']
    case 6:
      return arms.pasMoment['6']
    case 7:
      return arms.pasMoment['7']
    case 8:
      return arms.pasMoment['8']
    case 9:
      return arms.pasMoment['9']
    case 10:
      return arms.pasMoment['10']
    case 11:
      return arms.pasMoment['11']
    case 12:
      return arms.pasMoment['12']
    case 13:
      return arms.pasMoment['13']
    case 14:
      return arms.pasMoment['14']
    case 15:
      return arms.pasMoment['15']
    case 16:
      return arms.pasMoment['16']
    case 17:
      return arms.pasMoment['17']
    case 18:
      return arms.pasMoment['18']
    case 19:
      return arms.pasMoment['19']
    case 20:
      return arms.pasMoment['20']
    case 21:
      return arms.pasMoment['21']
    case 22:
      return arms.pasMoment['22']
    case 23:
      return arms.pasMoment['23']
    case 24:
      return arms.pasMoment['24']
    case 25:
      return arms.pasMoment['25']
    case 26:
      return arms.pasMoment['26']
    case 27:
      return arms.pasMoment['27']
    case 28:
      return arms.pasMoment['28']
    case 29:
      return arms.pasMoment['29']
    case 30:
      return arms.pasMoment['30']
    case 31:
      return arms.pasMoment['31']
    case 32:
      return arms.pasMoment['32']
    case 33:
      return arms.pasMoment['33']
    case 34:
      return arms.pasMoment['34']
    case 35:
      return arms.pasMoment['35']
    case 36:
      return arms.pasMoment['36']
    case 37:
      return arms.pasMoment['37']
    case 38:
      return arms.pasMoment['38']
    case 39:
      return arms.pasMoment['39']
    case 40:
      return arms.pasMoment['40']
    case 41:
      return arms.pasMoment['41']
    case 42:
      return arms.pasMoment['42']
    case 43:
      return arms.pasMoment['43']
    case 44:
      return arms.pasMoment['44']
    case 45:
      return arms.pasMoment['45']
    case 46:
      return arms.pasMoment['46']
    case 47:
      return arms.pasMoment['47']
    case 48:
      return arms.pasMoment['48']
    case 49:
      return arms.pasMoment['49']
    case 50:
      return arms.pasMoment['50']
    case 51:
      return arms.pasMoment['51']
    case 52:
      return arms.pasMoment['52']
    case 53:
      return arms.pasMoment['53']
    case 54:
      return arms.pasMoment['54']
    case 55:
      return arms.pasMoment['55']
    case 56:
      return arms.pasMoment['56']
    case 57:
      return arms.pasMoment['57']
    case 58:
      return arms.pasMoment['58']
    case 59:
      return arms.pasMoment['59']
    case 60:
      return arms.pasMoment['60']
    case 61:
      return arms.pasMoment['61']
    case 62:
      return arms.pasMoment['62']
    case 63:
      return arms.pasMoment['63']
    case 64:
      return arms.pasMoment['64']
    case 65:
      return arms.pasMoment['65']
    case 66:
      return arms.pasMoment['66']
    case 67:
      return arms.pasMoment['67']
    case 68:
      return arms.pasMoment['68']
    case 69:
      return arms.pasMoment['69']
    case 70:
      return arms.pasMoment['70']

    default:
      return 0
  }
}
export const getZfw = (bew: number, passangers: number, fwdCargo: number, aftCargo: number): number => {
  // returns zero fuel weight
  return bew + getPsgrWeight(passangers) + fwdCargo + aftCargo
}
export const getZfCg = (bew: number, bem: number, passangers: number, fwdCargo: number, aftCargo: number): number => {
  return getMAC(
    getCg(
      bew + getPsgrWeight(passangers) + fwdCargo + aftCargo,
      bem + getPsgrMoment(passangers) + getMoment(fwdCargo, arms.cargoFwd) + getMoment(aftCargo, arms.cargoAft)
    )
  )
}
export const getTOW = (fuel: number, bew: number, passangers: number, fwdCargo: number, aftCargo: number): number => {
  return bew + getPsgrWeight(passangers) + fwdCargo + aftCargo + getFuelWeight(fuel)
}
export const getTOCg = (
  fuel: number,
  bew: number,
  bem: number,
  passangers: number,
  fwdCargo: number,
  aftCargo: number
): number => {
  return getMAC(
    getCg(
      bew + getPsgrWeight(passangers) + fwdCargo + aftCargo + getFuelWeight(fuel),
      bem +
        getFuelCG(fuel) * getFuelWeight(fuel) +
        getPsgrMoment(passangers) +
        getMoment(fwdCargo, arms.cargoFwd) +
        getMoment(aftCargo, arms.cargoAft)
    )
  )
}
export const getLW = (
  fuel: number,
  fuelBurn: number,
  bew: number,
  passangers: number,
  fwdCargo: number,
  aftCargo: number
): number => {
  return bew + getPsgrWeight(passangers) + fwdCargo + aftCargo + getFuelWeight(fuel - fuelBurn)
}
export const getLdgCg = (
  fuel: number,
  fuelBurn: number,
  bew: number,
  bem: number,
  passangers: number,
  fwdCargo: number,
  aftCargo: number
): number => {
  return getMAC(
    getCg(
      bew + getPsgrWeight(passangers) + fwdCargo + aftCargo + getFuelWeight(fuel - fuelBurn),
      bem +
        getFuelCG(fuel - fuelBurn) * getFuelWeight(fuel - fuelBurn) +
        getPsgrMoment(passangers) +
        getMoment(fwdCargo, arms.cargoFwd) +
        getMoment(aftCargo, arms.cargoAft)
    )
  )
}
