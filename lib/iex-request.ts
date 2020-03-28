const ky = require('ky-universal')

import { defaultRequestOptions, defaultSearchParams } from './defaults'
import { IexSettings, Params } from './types'

function iexRequest (settings: IexSettings, path: string, params?: Params): Promise<any> {
  return ky(`https://${settings.env}.iexapis.com/${settings.version}${path}`, {
    ...defaultRequestOptions,
    searchParams: {
      ...defaultSearchParams,
      token: settings.token,
      ...params
    }
  }).then((resp: Response) => (params && params.format && params.format !== 'json')
    ? resp.text()
    : resp.json()
  )
}

export default iexRequest
