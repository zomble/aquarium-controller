var five = require('johnny-five'),
    chrono = require('chrono-node');

var priv = new WeakMap(),
    channels = [];

/**
 * Default
 * @constructor
 *
 * @param {Object} opts [description]
 */
function Default(opts) {

  if (!(this instanceof Default)) {
    return new Default(opts);
  }

  // Default instance properties
  this.value = 0;
  this.interval = null;

  channels.push(this);

  priv.set(this, {
    value: 0
  });

  Object.defineProperties(this, {
    value: {
      get: function () {
        return priv.get(this).value;
      }
    }
  });

  this.name = opts && opts.name || '';
  this.type = opts && opts.type || null;
  this.pin = opts && opts.pin || new five.Led({pin: opts && opts.addr || 9});
  this.opts = opts && opts.opts || {};
}

Default.prototype.run = function () {
  return this;
};


/**
 * on Turn the channel on
 * @return {Default}
 */
Default.prototype.on = function () {
  this.pin.on();
  return this;
};

/**
 * off Turn the channel off
 * @return {Default}
 */
Default.prototype.off = function () {
  this.pin.off();
  return this;
};

/**
 * toggle Toggle the on/off state of the channel.
 * @return {Default}
 */
Default.prototype.toggle = function () {
  this.pin.toggle();
  return this;
};

/**
 * createPeriodRange Creates date objects based of period config.
 * @todo Throw Exception on bad chrono time string.
 * @todo Support multiple periods, for more complex period configurations.
 * @param period A chrono-npm compatible start - end range.
 * @returns {{now: Date, start: Date, end: Date}}
 */
Default.prototype.createPeriodRange = function (period) {
  var dates = chrono.parse(period).pop(),
      nowDate = new Date();
  return {
    'now':   nowDate,
    'start': dates.start.date(),
    'end':   dates.end.date()
  };
};

/**
 * Given a "period" object, return true if this should be on or not.
 * @param period
 * @returns {boolean}
 */
Default.prototype.checkWithinPeriod = function (period) {
  var dates = this.createPeriodRange(period);

  if (dates.start <= dates.now && dates.end >= dates.now) {
    return true;
  }
  return false;
};

/**
 * Default.All()
 *
 * Return array of all current channels.
 *
 * @return {Default.Array}
 */
Default.all = function () {
  return channels;
};

module.exports = Default;