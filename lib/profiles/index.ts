import { IexProfilesClient, IexSettings, Params, IexResponse } from '../types'
import { validateSettings } from '../client'
import { Effect } from '../utils'
import iexRequest from '../iex-request'

function company (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestCompany (symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/company`, params)
  }
}

function logo (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestLogo (symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/logo`, params)
  }
}

class ProfilesClient implements IexProfilesClient {
  company: Function
  logo: Function

  constructor (settings: IexSettings) {
    Effect(validateSettings).run(settings)

    this.company = company(settings)
    this.logo = logo(settings)
  }

  static create (settings: IexSettings) {
    return new ProfilesClient(settings)
  }
}

export default ProfilesClient
module.exports = ProfilesClient
export {
  company,
  logo,
}