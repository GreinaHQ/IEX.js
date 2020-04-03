import { validateSettings} from './client'
import FundamentalsClient from './fundamentals'
import PricesClient from './prices'
import ProfilesClient from './profiles'
import { IexSettings, IexPricesClient, IexClient, IexFundamentalsClient, IexProfilesClient } from './types'
import { Effect } from './utils'

class Client implements IexClient {
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

  constructor (settings: IexSettings) {
    Effect(validateSettings).run(settings)

    this.prices = PricesClient.create(settings)
    this.history = this.prices.history
    this.intraday = this.prices.intraday
    this.previous = this.prices.previous
    this.price = this.prices.price
    this.quote = this.prices.quote

    this.profiles = ProfilesClient.create(settings)
    this.company = this.profiles.company
    this.logo = this.profiles.logo

    this.fundamentals = FundamentalsClient.create(settings)
    this.balanceSheet = this.fundamentals.balanceSheet
    this.cashFlow = this.fundamentals.cashFlow
    this.dividends = this.fundamentals.dividends
    this.earnings = this.fundamentals.earnings
    this.financials = this.fundamentals.financials
    this.reportedFinancials = this.fundamentals.reportedFinancials
    this.income = this.fundamentals.income
    this.splits = this.fundamentals.splits
  }

  static create (settings: IexSettings) {
    return new Client(settings)
  }
}

export default Client
module.exports = Client
export * from './types'
