const assert = require('assert').strict

const Client = require('../dist')

;(async function () {
  try {
    let result

    assert.throws(() => Client.create(), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 12345}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: '12345'}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 'Tsk_12345'}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 'Tpk_12345', env: 'foo'}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 'Tpk_12345', version: 'foo'}), 'Expected Client to throw')
    const iex = Client.create({ token: process.env.IEX_TOKEN })
    assert.strictEqual(typeof iex.history, 'function', 'expected client to have function "history"')
    assert.strictEqual(typeof iex.intraday, 'function', 'expected client to have function "intraday"')
    assert.strictEqual(typeof iex.previous, 'function', 'expected client to have function "previous"')
    assert.strictEqual(typeof iex.price, 'function', 'expected client to have function "price"')
    assert.strictEqual(typeof iex.quote, 'function', 'expected client to have function "quote"')

    result = await iex.history('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    result = await iex.history('aapl', undefined, '5d')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')
    assert.strictEqual(result.length, 5, 'expected result length to be 5')

    result = await iex.history('aapl', { format: 'csv' }, '5d')
    assert.strictEqual(typeof result, 'string', 'expected result to be string')

    result = await iex.intraday('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    result = await iex.previous('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')

    result = await iex.price('aapl')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')

    result = await iex.quote('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    result = await iex.quote('aapl', undefined, 'latestPrice')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')
  } catch (e) {
    console.error('Failed test:', e)
  }
})();
