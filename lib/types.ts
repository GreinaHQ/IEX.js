type Params = { [key: string]: string | number | boolean }

type IexVersion = 'beta' | 'latest' | 'stable' | 'v1'
const _iexVersions: IexVersion[] = ['beta', 'latest', 'stable', 'v1']

type IexEnv = 'cloud' | 'sandbox'
const _iexEnvs: IexEnv[] = ['cloud', 'sandbox']

interface IexSettings {
  token: string
  env?: IexEnv
  version?: IexVersion
}

type IexHistoryRange = string[6] | 'max' | '5y' | '2y' | '1y' | 'ytd' | '6m' | '3m' | '1m' | '1mm' | '5d' | '5dm' | 'dynamic'
type IexCARange = '5y' | '2y' | '1y' | 'ytd' | '6m' | '3m' | '1m' | 'next'
type IexFiling = '10-K' | '10-Q'

type IexResponse = Promise<string | Object>

interface IexFundamentalsClient {
  balanceSheet: Function
  cashFlow: Function
  dividends: Function
  earnings: Function
  financials: Function
  reportedFinancials: Function
  income: Function
  splits: Function
}

interface IexPricesClient {
  history: Function
  intraday: Function
  previous: Function
  price: Function
  quote: Function
}

interface IexProfilesClient {
  company: Function
  logo: Function
}

interface IexClient {
  prices: IexPricesClient
  history: Function
  intraday: Function
  previous: Function
  price: Function
  quote: Function

  profiles: IexProfilesClient
  company: Function
  logo: Function

  fundamentals: IexFundamentalsClient
  balanceSheet: Function
  cashFlow: Function
  dividends: Function
  earnings: Function
  financials: Function
  reportedFinancials: Function
  income: Function
  splits: Function
}

export {
  _iexEnvs,
  _iexVersions,
  IexClient,
  IexCARange,
  IexEnv,
  IexFiling,
  IexFundamentalsClient,
  IexPricesClient,
  IexProfilesClient,
  IexHistoryRange,
  IexResponse,
  IexSettings,
  IexVersion,
  Params,
}
