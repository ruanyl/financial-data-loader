import test from 'ava';
import { quote } from '../src/quote';

const defaultOpt = {
  symbol: 'sh600778',
  start: '2012-01-01',
  end: '2012-12-31',
  fq: 'qfq',
};

test.cb('get kdata: day', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: 'day' };
  const callback = function cb(data) {
    t.truthy(data.length === 231, 'should have 242 trading day in 2012');
    t.end();
  };
  ttQuote.getKData(opt).then(callback);
});

test.cb('get kdata: week', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: 'week' };
  const callback = function cb(data) {
    t.truthy(data.length === 49, 'Should have 49 trading weeks in 2012');
    t.end();
  };
  ttQuote.getKData(opt).then(callback);
});

test.cb('get kdata: month', t => {
  t.plan(1);
  const ttQuote = quote();
  const opt = { ...defaultOpt, ktype: 'month' };
  const callback = function cb(data) {
    t.truthy(data.length === 12, 'Should have 12 trading month in 2012');
    t.end();
  };
  ttQuote.getKData(opt).then(callback);
});
