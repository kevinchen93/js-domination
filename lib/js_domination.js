/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class DOMNodeCollection {
  constructor(array) {
    this.elements = array;
  }

  html(string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach( el => {
        el.innerHTML = string;
      });
    }

    return this;
  }

  empty() {
    this.elements.forEach(el => el.innerHTML = '');
  }

  append(arg) {
    // if (arg.constructor.name === 'DOMNodeCollection') {
    //   arg.elements.forEach( argEl => {
    //     this.elements.forEach( colEl => {
    //       colEl.innerHTML = argEl.outerHTML;
    //     });
    //   });
    // } else {
    //   arg = arg.constructor.name === 'String' ? arg : arg.outerHTML;
    //   this.html(arg);
    // }
    //
    // return this;
    if (arg.constructor.name === 'String') {
      for (let i = this.elements.length - 1; i >= 0; i--) {
        this.elements[i].innerHTML += arg;
      }
    } else if (arg.constructor.name === 'HTMLElement') {
      for (let i = this.elements.length - 1; i >= 0; i--) {
        this.elements[i].innerHTML += arg.outerHTML;
      }
    } else if (arg.constructor.name === 'DOMNodeCollection') {
        arg.elements.forEach( argEl =>
        this.elements[i].innerHTML += argEl.outerHTML);
      }
    }

  attr(attributeName, value) {
    const filtered = this.elements.filter( el => el.hasAttribute(attributeName) );

    if (value === undefined) {
      return filtered;
    } else {
      filtered.forEach( el => el.setAttribute(attributeName) );
    }

    return new DOMNodeCollection(filtered);
  }

  addClass(className) {
    const addedClasses = className.split(' ');

    this.elements.forEach( el => {
      let elClasses = [];

      if (el.getAttribute('class')) {
        elClasses = elClasses.concat(el.getAttribute('class').split(' '));
        el.removeAttribute('class');
      }

      const classesToAdd = addedClasses.filter( elClass => {
        return !elClass.includes(elClass);
      });

      el.setAttribute('class', classesToAdd.concat(elClasses).join(' '));
    });

    return this;
  }

  removeClass(className) {
    const removeClasses = className.split(' ');

    this.elements.forEach( el => {
      if (!el.getAttribute('class')) {
        return;
      }

      const elClasses = el.getAttribute('class').split(' ');
      el.removeAttribute('class');

      const classesToKeep = elClasses.filter( elClass => {
        return !removeClasses.includes(elClass);
      });

      if (classesToKeep.length > 0) {
        el.setAttribute('class', classesToKeep.join(' '));
      }
    });

    return this;
  }

  children() {
    let allChildren = [];

    this.elements.forEach( el => {
      const elChildren = Array.from(el.children);
      elChildren.forEach( child => {
        allChildren.push(child);

        if (Array.from(child.children).length > 0) {
          const childNode = window.$l(child);
          allChildren = allChildren.concat(childNode.children());
        }
      });
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const parents = [];

    this.elements.forEach( el => {
      parents.push(el.parentElement);
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let selected = [];

    this.elements.forEach( el => {
      selected = selected.concat(Array.from(el.querySelectorAll(selector)));
    });

    return new DOMNodeCollection(selected);
  }

  remove() {
    this.elements.forEach( el => {
      el.parentElement.removeChild(el);
    });

    this.elements = [];
  }

  on(eventType, callback) {
    this.elements.forEach( el => {
      el.addEventListener(eventType, callback);
      el[eventType + 'callback'] = callback;
    });

  }

  off(eventType) {
    const callback = this[eventType];
    this.elements.forEach( el => {
      el.removeEventListener(eventType, callback);
      el[eventType + 'callback'] = null;
    });
  }
}



/* harmony default export */ __webpack_exports__["default"] = (DOMNodeCollection);


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");


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

    return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__["default"](collection);
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

// TODO: add APIs
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = $l('.search-input').elements[0];

});


/***/ })

/******/ });
//# sourceMappingURL=js_domination.js.map
