# IEX.js

A JavaScript client for the IEX Cloud API, usable in both NodeJS and browsers.

## Installation

```sh
$ npm install iex
```

## Usage

```js
import createClient from 'iex'

const { history } = createClient('pk_youriextoken')

history('AAPL')
```

## API

### createClient
```ts
creatClient(token, env?, version? = 'stable'): IEXClient
```
Creates a client.<br>
Determines *env* from the passed's token prefix if not explicitely set, defaults to stable for *version*

### IEXClient

#### history
```ts
IEXClient.history(symbol: string, params?: Object, range?: string): string | Object
```
Requests historical prices for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (e.g. *includeLast*) supports.<br>
`range` can be a range as specified in the docs

#### intraday
```ts
IEXClient.intraday(symbol: string, params?: Object): string | Object
```
Requests intraday prices for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (e.g. *chartIEXOnly*) supports.

#### previous
```ts
IEXClient.previous(symbol: string, params?: Object): string | Object
```
Requests closing data of the previous trading day for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (currently none) supports.<br>

#### price
```ts
IEXClient.price(symbol: string, params?: Object): number
```
Requests the latest price for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (currently none) supports.<br>

#### quote
```ts
IEXClient.quote(symbol: string, params?: Object, field?: string): string | Object
```
Requests realtime/delyed quote data (e.g. OHLC, volume, 52 week high, ...) for `symbol`.<br>
`params` can be any query parameters the overall API (e.g. *format*) or the enpoint (e.g. *displayPercent*) supports.<br>
`field` can be used to limit data to one attribute of the full response
