import parallel from 'async/parallel';

import { charset as decode } from './utils/charset';
import './utils/fetch';

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};
/**
 * Simple wrap of fetch
 * create a list of fetch tasks
 * return [promise, promise, ...]
 */
export const createFetchTasks = resources =>
  resources.map(resource => {
    const { url, options = {}, charset, contentType = 'text' } = resource;
    let fetcher = fetch(url, options)
      .then(checkStatus);

    if (charset) {
      fetcher = fetcher.then(decode(charset));
    }

    if (contentType === 'json') {
      fetcher = fetcher.then(res => res.json());
    } else {
      fetcher = fetcher.then(res => res.text());
    }
    return fetcher;
  });

/**
 * @return [ [obj, obj, ...], [obj, obj, ...], ... ]
 */
export const runTasksInParallel = tasks =>
  new Promise((resolve, reject) => {
    parallel(
      tasks.map(task => callback => task.then(data => callback(null, data))),
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });


export const load = resources => {
  const tasks = createFetchTasks(resources);
  return runTasksInParallel(tasks);
};
