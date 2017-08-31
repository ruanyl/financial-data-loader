import { range, compose, multiply, take, lensPath, unnest, view } from 'ramda';

import * as cons from './cons';

/* 日线，月线，年线 - 数据来源，腾讯 */
export const klineTTUrl = (autype, symbol, ktype, start, end) => {
  const kline = autype ? 'fqkline' : 'kline';
  const path = autype ? 'get' : 'kline';
  const fqQuery = autype ? `,${autype}` : '';
  return `http://web.ifzq.gtimg.cn/appstock/app/${kline}/${path}?param=${symbol},${ktype},${start},${end},640${fqQuery}`;
};

/* 分钟线 - 数据来源，腾讯 */
export const klineTTMinUrl = (symbol, ktype) =>
      `http://ifzq.gtimg.cn/appstock/app/kline/mkline?param=${symbol},m${ktype},,,`;

/**
 * String -> Number
 * @param {String} dateString - a date string formatted with 'YYYY-MM-DD', for example: '2017-12-31'
 * @returns {Number} year in number, for example: 2017
 */
const yearOfDateString = compose(multiply(1), take(4));

const config = {
  getHistoryKData: {
    createResources: options => {
      if (cons.K_LABELS.includes(options.ktype)) {
        const startYear = yearOfDateString(options.start);
        const endYear = yearOfDateString(options.end);
        const years = range(startYear, endYear + 1);
        return years.map(year => {
          const startOfYear = `${year}-01-01`;
          const endOfYear = `${year}-12-31`;
          const url = klineTTUrl(options.autype, options.symbol, options.ktype, startOfYear, endOfYear);
          return { url };
        });
      }

      if (cons.K_MIN_LABELS.includes(options.ktype)) {
        const url = klineTTMinUrl(options.symbol, options.ktype);
        return [{ url }];
      }
      return [];
    },
    transform: options => rawDataList => {
      let dataLens;
      if (cons.K_LABELS.includes(options.ktype)) {
        dataLens = lensPath(['data', options.symbol, `${options.autype}${options.ktype}`]);
      } else {
        dataLens = lensPath(['data', options.symbol, `m${options.ktype}`]);
      }
      return unnest(rawDataList.map(compose(view(dataLens), JSON.parse)));
    },
  },
};

export default config;
