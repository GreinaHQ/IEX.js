const assert = require('assert').strict

const Client = require('../dist')

;(async function () {
  try {
    /** Client */
    assert.throws(() => Client.create(), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 12345}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: '12345'}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 'Tsk_12345'}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 'Tpk_12345', env: 'foo'}), 'Expected Client to throw')
    assert.throws(() => Client.create({ token: 'Tpk_12345', version: 'foo'}), 'Expected Client to throw')

    const iex = Client.create({ token: process.env.IEX_TOKEN })
    let result

    /** Prices */

    // history
    result = await iex.history('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    result = await iex.history('aapl', undefined, '5d')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')
    assert.strictEqual(result.length, 5, 'expected result length to be 5')

    result = await iex.history('aapl', { format: 'csv' }, '5d')
    assert.strictEqual(typeof result, 'string', 'expected result to be string')

    // intraday
    result = await iex.intraday('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    // previous
    result = await iex.previous('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')

    // price
    result = await iex.price('aapl')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')

    // quote
    result = await iex.quote('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    result = await iex.quote('aapl', undefined, 'latestPrice')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')

    /** Fundamentals */

    // balance sheet
    result = await iex.balanceSheet('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    assert.strictEqual(Array.isArray(result.balancesheet), true, 'expected result to have balancesheet of type array')

    // cash flow
    result = await iex.cashFlow('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    assert.strictEqual(Array.isArray(result.cashflow), true, 'expected result to have cashflow of type array')

    // dividends
    result = await iex.dividends('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')

    // earnings
    result = await iex.earnings('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    assert.strictEqual(Array.isArray(result.earnings), true, 'expected result to have earnings of type array')

    result = await iex.earnings('aapl', {}, 2)
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    assert.strictEqual(Array.isArray(result.earnings), true, 'expected result to have earnings of type array')
    assert.strictEqual(result.earnings.length, 2, 'expected earnings to have 2 items')

    result = await iex.earnings('aapl', {}, 1, 'actualEPS')
    assert.strictEqual(typeof result, 'number', 'expected result to be number')

    // financials
    result = await iex.financials('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    assert.strictEqual(Array.isArray(result.financials), true, 'expected result to have financials of type array')

    // reported financials
    result = await iex.reportedFinancials('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')
    result = await iex.reportedFinancials('aapl', { last: 1 }, '10-K')
    assert.strictEqual(result.length, 1, 'expected result to have one item')
    // assert.strictEqual(result[0].subkey, '10-K', 'expected result item to be 10-K filing')

    // income
    result = await iex.income('aapl')
    assert.strictEqual(typeof result, 'object', 'expected result to be object')
    assert.strictEqual(Array.isArray(result.income), true, 'expected result to have income of type array')

    // splits
    result = await iex.splits('aapl')
    assert.strictEqual(Array.isArray(result), true, 'expected result to be array')
  } catch (e) {
    console.error('Failed test:', e)
  }
})();
