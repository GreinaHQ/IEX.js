import * as _prices from './prices'
import { IexSettings, IexPricesClient, IexClient } from './types'

function createClient (settings: IexSettings): IexClient {
  if (typeof settings.token !== 'string' && !(settings.token as any instanceof String)) throw Error('You must pass a token as string')
  else if (settings.token.startsWith('Tsk_') && !settings.env) settings.env = 'sandbox'
  else if (settings.token.startsWith('pk_') && !settings.env) settings.env = 'cloud'
  else throw Error('Invalid token, did you might pass a secret token?')

  if (!settings.version) settings.version = 'stable'

  const initFn = (fn: Function) => fn(settings)
  const initNs = (ns: Object): any => {
    let ins: Object = {}
    ;(Object.keys(ns) as Array<keyof typeof ns>).map((fnn): void => { ins[fnn] = initFn(ns[fnn]) })
    return ins
  }

  const prices: IexPricesClient = initNs(_prices)

  return {
    prices,
    history: prices.history,
    intraday: prices.intraday,
    previous: prices.previous,
    price: prices.price,
    quote: prices.quote,
  }
}

export default createClient
export * from './types'
module.exports = createClient
