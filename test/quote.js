import test from 'ava';
import { quote } from '../src/quote';

const defaultOpt = {
  symbol: 'sh600778',
  start: '20120101',
  end: '20121231',
  autype: 'qfq',
};

test.cb('get kdata: day', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: 'day' };
  const callback = data => {
    t.truthy(data.length === 231, 'should have 242 trading day in 2012');
    t.end();
  };
  ttQuote.getHistoryKData(opt).then(callback);
});

test.cb('get kdata: week', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: 'week' };
  const callback = data => {
    t.truthy(data.length === 49, 'Should have 49 trading weeks in 2012');
    t.end();
  };
  ttQuote.getHistoryKData(opt).then(callback);
});

test.cb('get kdata: month', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: 'month' };
  const callback = data => {
    t.truthy(data.length === 12, 'Should have 12 trading month in 2012');
    t.end();
  };
  ttQuote.getHistoryKData(opt).then(callback);
});

test.cb('get kdata: 5 minute', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: '5' };
  const callback = data => {
    t.truthy(data.length > 0, 'Should have 5 minute data');
    t.end();
  };
  ttQuote.getHistoryKData(opt).then(callback);
});

test.cb('get kdata: 15 minute', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: '15' };
  const callback = data => {
    t.truthy(data.length > 0, 'Should have 15 minute data');
    t.end();
  };
  ttQuote.getHistoryKData(opt).then(callback);
});

test.cb('get kdata: 30 minute', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: '30' };
  const callback = data => {
    t.truthy(data.length > 0, 'Should have 30 minute data');
    t.end();
  };
  ttQuote.getHistoryKData(opt).then(callback);
});
