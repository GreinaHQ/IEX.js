import { validateSettings } from '../client'
import iexRequest from '../iex-request'
import {
  IexCARange,
  IexFundamentalsClient,
  IexResponse,
  IexSettings,
  Params,
  IexFiling,
} from '../types'
import { Effect } from '../utils'

function balanceSheet (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestBalanceSheet (symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/balance-sheet`, params)
  }
}

function cashFlow (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestCashFlow (symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/cash-flow`, params)
  }
}

function dividends (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestDividends (symbol: string, params?: Params, range?: IexCARange ): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/dividends${ range ? `/${range}`: ''}`, params)
  }
}

function earnings (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestEarnings (symbol: string, params?: Params, last?: number, field?: string): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/earnings${last ? `/${last}`: ''}${field ? `/${field}`: ''}`, params)
  }
}

function financials (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestFinancials (symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/financials`, params)
  }
}

function reportedFinancials (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestReportedFinancials (symbol: string, params?: Params, filing?: IexFiling ): IexResponse {
    return iexRequest(settings, `/time-series/reported_financials/${symbol}${filing ? `/${filing}`: ''}`, params)
  }
}

function income (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestIncome (symbol: string, params?: Params): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/income`, params)
  }
}

function splits (settings: IexSettings) {
  Effect(validateSettings).run(settings)
  return function requestSplits (symbol: string, params?: Params, range?: IexCARange ): IexResponse {
    return iexRequest(settings, `/stock/${symbol}/splits${ range ? `/${range}`: ''}`, params)
  }
}

class FundamentalsClient implements IexFundamentalsClient {
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

    this.balanceSheet = balanceSheet(settings)
    this.cashFlow = cashFlow(settings)
    this.dividends = dividends(settings)
    this.earnings = earnings(settings)
    this.financials = financials(settings)
    this.reportedFinancials = reportedFinancials(settings)
    this.income = income(settings)
    this.splits = splits(settings)
  }

  static create (settings: IexSettings) {
    return new FundamentalsClient(settings)
  }
}

export default FundamentalsClient
module.exports = FundamentalsClient
export {
  FundamentalsClient,
  balanceSheet,
  cashFlow,
  dividends,
  earnings,
  financials,
  reportedFinancials,
  income,
}
