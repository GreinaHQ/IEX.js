import { validateSettings} from './client'
import PricesClient from './prices'
import { IexSettings, IexPricesClient, IexClient } from './types'
import { Effect } from './utils'

class Client implements IexClient {
  prices: IexPricesClient
  history: Function
  intraday: Function
  previous: Function
  price: Function
  quote: Function

  constructor (settings: IexSettings) {
    Effect(validateSettings).run(settings)

    this.prices = PricesClient.create(settings)
    this.history = this.prices.history
    this.intraday = this.prices.intraday
    this.previous = this.prices.previous
    this.price = this.prices.price
    this.quote = this.prices.quote
  }

  static create (settings: IexSettings) {
    return new Client(settings)
  }
}

export default Client
module.exports = Client
export * from './types'
