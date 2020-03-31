import { validateSettings } from '../client'
import iexRequest from '../iex-request'
import { Params, IexRange, IexResponse, IexPricesClient, IexSettings } from '../types'

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

class PricesClient implements IexPricesClient {
  history: Function
  intraday: Function
  previous: Function
  price: Function
  quote: Function

  constructor (settings: IexSettings) {
    validateSettings(settings)

    this.history = history(settings)
    this.intraday = intraday(settings)
    this.previous = previous(settings)
    this.price = price(settings)
    this.quote = quote(settings)
  }

  static create (settings: IexSettings) {
    return new PricesClient(settings)
  }
}

export default PricesClient
module.exports = PricesClient
export {
  history,
  intraday,
  previous,
  price,
  quote,
}
