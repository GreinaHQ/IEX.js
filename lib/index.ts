import { Options as KyOptions } from 'ky'
const ky = require('ky-universal')

type IexRange = string[6] | 'max' | '5y' | '2y' | '1y' | 'ytd' | '6m' | '3m' | '1m' | '1mm' | '5d' | '5dm' | 'dynamic'
type IexResponse = Promise<string | Object>
type Params = { [key: string]: string | number | boolean }

const defaultRequestOptions: KyOptions = {}
const defaultSearchParams: Params = {}

function createClient (token: string, env?: string, version?: string): Object {
  if (typeof token !== 'string' && !(token as any instanceof String))  throw Error('You must pass a token as string')
  else if (token.startsWith('Tpk_') && !env) env = 'sandbox'
  else if (token.startsWith('pk_') && !env) env = 'cloud'
  else throw Error('Invalid token, did you might pass a secret token?')

  if (!version) version = 'stable'

  const iexRequest = (path: string, params?: Params): Promise<any> => {
    return ky(`https://${env}.iexapis.com/${version}${path}`, {
      ...defaultRequestOptions,
      searchParams: {
        ...defaultSearchParams,
        token,
        ...params
      }
    }).then((resp: Response) => (params && params.format && params.format !== 'json')
      ? resp.text()
      : resp.json()
    )
  }

  function history (symbol: string, params?: Params, range?: IexRange ): IexResponse {
    return iexRequest(`/stock/${symbol}/chart${ range ? `/${range}`: ''}`, params)
  }

  function intraday(symbol: string, params?: Params): IexResponse {
    return iexRequest(`/stock/${symbol}/intraday-prices`, params)
  }

  function previous(symbol: string, params?: Params): IexResponse {
    return iexRequest(`/stock/${symbol}/previous`, params)
  }

  function price(symbol: string, params?: Params): IexResponse {
    return iexRequest(`/stock/${symbol}/price`, params)
  }

  function quote(symbol: string, params?: Params, field?: string): IexResponse {
    return iexRequest(`/stock/${symbol}/quote${ field ? `/${field}`: ''}`, params)
  }

  return {
    history,
    intraday,
    previous,
    price,
    quote,
  }
}

export default createClient
