import iexRequest from '../iex-request'
import { Params, IexRange, IexResponse, IexSettings } from '../types'

function history (settings: IexSettings) {
  return function requestHistory (symbol: string, params?: Params, range?: IexRange ): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/chart${ range ? `/${range}`: ''}`, params)
  }
}

function intraday (settings: IexSettings) {
  return function requestIntraday(symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/intraday-prices`, params)
  }
}

function previous (settings: IexSettings) {
  return function requestPrevious(symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/previous`, params)
  }
}

function price (settings: IexSettings) {
  return function requestPrice(symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/price`, params)
  }
}

function quote (settings: IexSettings) {
  return function requestQuote(symbol: string, params?: Params, field?: string): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/quote${ field ? `/${field}`: ''}`, params)
  }
}

export {
  history,
  intraday,
  previous,
  price,
  quote,
}
