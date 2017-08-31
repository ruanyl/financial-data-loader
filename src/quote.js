import { map } from 'ramda';

import defaultConfig from './defaultQuoteConfig';
import { load } from './loader';

export const quote = (config = defaultConfig) =>
  map(v => options =>
    load(v.createResources(options))
    .then(v.transform(options)), config);
