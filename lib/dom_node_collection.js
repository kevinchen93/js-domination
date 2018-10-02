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



export default DOMNodeCollection;
