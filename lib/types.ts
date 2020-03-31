type Params = { [key: string]: string | number | boolean }

type IexVersion = 'beta' | 'latest' | 'stable' | 'v1'
const _iexVersions: IexVersion[] = ['beta', 'latest', 'stable', 'v1']

type IexEnv = 'cloud' | 'sandbox'
const _iexEnvs: IexEnv[] = ['cloud', 'sandbox']

interface IexSettings {
  token: string,
  env?: IexEnv,
  version?: IexVersion,
}

type IexRange = string[6] | 'max' | '5y' | '2y' | '1y' | 'ytd' | '6m' | '3m' | '1m' | '1mm' | '5d' | '5dm' | 'dynamic'

type IexResponse = Promise<string | Object>

interface IexPricesClient {
  history: Function,
  intraday: Function,
  previous: Function,
  price: Function,
  quote: Function,
}

interface IexClient {
  prices: IexPricesClient,

  history: Function,
  intraday: Function,
  previous: Function,
  price: Function,
  quote: Function,
}

export {
  _iexEnvs,
  _iexVersions,
  IexClient,
  IexEnv,
  IexPricesClient,
  IexRange,
  IexResponse,
  IexSettings,
  IexVersion,
  Params,
}
