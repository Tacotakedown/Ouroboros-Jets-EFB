import { initializeApp, Scope, type NavigraphApp } from 'navigraph/app'
import { getAuth } from 'navigraph/auth'
import { getChartsAPI } from 'navigraph/charts'
import { getPackagesAPI } from 'navigraph/packages'

const config: NavigraphApp = {
  clientId: process.env.NG_CLIENT_ID ?? '<',
  clientSecret: process.env.NG_CLIENT_SECRET ?? '<',
  scopes: [Scope.CHARTS, Scope.FMSDATA]
}

initializeApp(config)

export const auth = getAuth()
export const charts = getChartsAPI()
export const packages = getPackagesAPI()
