import defaultConfig from './defaultQuoteConfig';
import { load } from './loader';

export const quote = (config = defaultConfig) => {
  const getKData = options => {
    const resources = config.getKData.createResources(options);
    return load(resources)
    .then(config.getKData.transform(options));
  };

  return {
    getKData,
  };
};
