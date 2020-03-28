type Params = { [key: string]: string | number | boolean }

type IexRange = string[6] | 'max' | '5y' | '2y' | '1y' | 'ytd' | '6m' | '3m' | '1m' | '1mm' | '5d' | '5dm' | 'dynamic'

type IexResponse = Promise<string | Object>
interface IexSettings {
  token: string,
  env?: string,
  version?: string,
}

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
  IexClient,
  IexPricesClient,
  IexRange,
  IexResponse,
  IexSettings,
  Params,
}
