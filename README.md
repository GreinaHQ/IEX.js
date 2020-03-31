# IEX.js

> **This library is in early development, so there might be breaking changes**

A universal JavaScript client for the IEX Cloud API, therefor usable in both NodeJS and browsers.

## Installation

```sh
$ npm install iex
```

## Usage

### 1. IEXClient

Recommended if you use multiple endpoints, multiple times. Exports all
endpoints, as well as namespaced by category.

```js
import IEXClient from 'iex'
// or
const IEXClient = require('iex')

const iex = IEXClient.create({ token: 'pk_youriextoken' })

await iex.prices.history('AAPL')
// or
await iex.history('AAPL')
```

**When the API returns JSON it will be parsed, otherwise you'll receive a string.**

### 2. Direct imports

Recommended if you only need one or few endpoints and calls

```js
import { history } from 'iex/prices'

// For quick single calls, initialise and call:
await history({ token: 'pk_youriextoken' })('aapl')

// For multiple calls, initialise once, call multiple times:
const fetchHistory = history({ token: 'pk_youriextoken' })
await fetchHistory('aapl')
await fetchHistory('msft')
```

## API

### IEXClient
```ts
class IEXClient({ token, env?, version? = 'stable' })
IEXClient.create({ token, env?, version? = 'stable' }): IexClient
```
Creates a client with pre-initialized enpoint functions (opposite to single imports requiring initialisation).<br>
Determines *env* from the passed token prefix if not explicitely set, defaults to stable for *version*

### IEXClient instance

#### prices

##### history
```ts
IEXClient.history(symbol: string, params?: Object, range?: string): Promise<string | Object>
```
Requests historical prices for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (e.g. *includeLast*) supports.<br>
`range` can be a range as specified in the docs

##### intraday
```ts
IEXClient.intraday(symbol: string, params?: Object): Promise<string | Object>
```
Requests intraday prices for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (e.g. *chartIEXOnly*) supports.

##### previous
```ts
IEXClient.previous(symbol: string, params?: Object): Promise<string | Object>
```
Requests closing data of the previous trading day for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (currently none) supports.<br>

##### price
```ts
IEXClient.price(symbol: string, params?: Object): Promise<number>
```
Requests the latest price for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (currently none) supports.<br>

##### quote
```ts
IEXClient.quote(symbol: string, params?: Object, field?: string): Promise<string | Object>
```
Requests realtime/delyed quote data (e.g. OHLC, volume, 52 week high, ...) for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (e.g. *displayPercent*) supports.<br>
`field` can be used to limit data to one attribute of the full response
