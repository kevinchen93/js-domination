const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg) {
  let collection;
  const callbacks = [];

  if (arg instanceof Function) {
    callbacks.push(arg);
  } else {
    if (arg instanceof HTMLElement) {
      collection = [arg];
    } else {
      collection = Array.from(document.querySelectorAll(arg));
    }

    return new DOMNodeCollection(collection);
  }

  document.addEventListener('DOMContentLoaded', () => {
    callbacks.forEach( callback => {
      callback();
    });
  });
};

$l.extend = function(...objs) {
  const result = objs[0];

  for (let i = 1; i < objs.length; i++) {
    const keys = Object.keys(objs[i]);

    keys.forEach( key => {
      result[key] = objs[i][key];
    });
  }

  return result;
};

$l.ajax = function(options) {
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

  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', 'path');
  // xhr.onload = function() {
  //   console.log(xhr.status);
  //   console.log(xhr.responseType);
  //   console.log(xhr.response);
  //   if (xhr.status === '200') {
  //     options.success(JSON.parse(xhr.response));
  //   } else {
  //     options.error(JSON.parse(xhr.response));
  //   }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(ourOptions.method, ourOptions.url, true);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject(JSON.parse(xhr.statusText));
    xhr.send(JSON.stringify(ourOptions.data));
  });
};

function handleClick(e) {
  e.preventDefault();
  console.log('WE ARE HERE NOW');
}

// TODO: add APIs
$(() => {
  let imagesForm = window.$l('form').elements[0];
  imagesForm.addEventListener('submit', handleClick);
}
