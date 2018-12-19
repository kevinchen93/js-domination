# js-domination

[Live!](https://kevinnn.co/js-domination/)

## API

js-domination is a simple JavaScript library that provides convenient methods to interact with APIs.
Much like its inspiration, the jQuery library, js-domination allows users to type less and do more!

## DOMNodeCollection Methods

js-domination houses DOMNodeCollection methods to query for, modify, and manipulate Document Object Model (DOM) elements, including:

* `#addClass`
* `#removeClass`
* `#empty`
* `#append`
* `#parent`
* `#children`
* `#on`
* `#off`
* `##ajax`
* `##extend`

## AJAX Requests

One of the main features of js-dominaton is the ability to make AJAX requests (i.e. to an API endpoint), and have it return a promise.

```javascript
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
```
