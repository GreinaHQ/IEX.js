const assert = require('assert').strict

const createClient = require('../dist').default

;(async function () {
  try {
    let result

    assert.throws(() => createClient(), 'Expected createClient to throw')
    assert.throws(() => createClient(12345), 'Expected createClient to throw')
    assert.throws(() => createClient('12345'), 'Expected createClient to throw')
    const iex = createClient(process.env.IEX_TOKEN)
    assert.strictEqual(typeof iex.history, 'function', 'expected client to have function "history"')
    assert.strictEqual(typeof iex.intraday, 'function', 'expected client to have function "history"')
    assert.strictEqual(typeof iex.previous, 'function', 'expected client to have function "history"')

    result = await iex.history('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    result = await iex.intraday('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    result = await iex.previous('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')

    result = await iex.quote('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    result = await iex.quote('aapl', undefined, 'latestPrice')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')

    result = await iex.price('aapl')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')
  } catch (e) {
    console.error('Failed test:', e)
  }
})();
