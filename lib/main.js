import DOMNodeCollection from './dom_node_collection.js';

const $l = function(arg) {
  let collection;

  if (arg instanceof Function) {
    document.addEventListener('DOMContentLoaded', arg);
  } else {
    if (arg instanceof HTMLElement) {
      collection = [arg];
    } else {
      collection = Array.from(document.querySelectorAll(arg));
    }

    return new DOMNodeCollection(collection);
  }
};

$l.extend = function(...objs) {
  const result = objs[0];
  if (objs.length <= 1) return null;

  for (let i = 1; i < objs.length; i++) {
    const keys = Object.keys(objs[i]);

    keys.forEach( key => {
      result[key] = objs[i][key];
    });
  }

  return result;
};

$l.ajax = function(options) {
  const xhr = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: '',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success(data) {
      console.log('Success.');
    },
    error() {
      console.log('Error.');
    },
  };

  const ourOptions = this.extend(defaults, options);

  return new Promise((resolve, reject) => {
    xhr.open(ourOptions.method, ourOptions.url, true);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(JSON.stringify(ourOptions.data));
  });
};

window.$l = $l;
