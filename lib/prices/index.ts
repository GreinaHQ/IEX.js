import { validateSettings } from '../client'
import iexRequest from '../iex-request'
import { Params, IexRange, IexResponse, IexPricesClient, IexSettings } from '../types'
import { Effect } from '../utils'

function history (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestHistory (symbol: string, params?: Params, range?: IexRange ): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/chart${ range ? `/${range}`: ''}`, params)
  }
}

function intraday (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestIntraday(symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/intraday-prices`, params)
  }
}

function previous (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestPrevious(symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/previous`, params)
  }
}

function price (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestPrice(symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/price`, params)
  }
}

function quote (settings: IexSettings) {
  Effect(validateSettings).run(settings)
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
    Effect(validateSettings).run(settings)

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
