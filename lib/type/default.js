
var five = require('johnny-five');

var priv = new WeakMap(),
    channels = [];

function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

/**
 * Channel
 * @constructor
 *
 * @param {Object} opts [description]
 */
function Channel(opts) {

  if (!(this instanceof Channel)) {
    return new Channel(opts);
  }

  // Channel instance properties
  this.value = 0;
  this.interval = null;

  channels.push(this);

  console.log(channels.length);

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

Channel.prototype.run = function () {
  return this;
};


/**
 * on Turn the channel on
 * @return {Channel}
 */
Channel.prototype.on = function () {
  this.pin.on();
  return this;
};

/**
 * off Turn the channel off
 * @return {Channel}
 */
Channel.prototype.off = function () {
  this.pin.off();
  return this;
};

/**
 * toggle Toggle the on/off state of the channel.
 * @return {Channel}
 */
Channel.prototype.toggle = function () {
  this.pin.toggle();
  return this;
};

/**
 * createPeriodRange Creates date objects based of period config.
 * @param period
 * @returns {{now: Date, start: Date, end: Date}}
 */
Channel.prototype.createPeriodRange = function (period) {
  var nowDate = new Date(),
    defaults = {
      "year":   nowDate.getFullYear(),
      "month":  nowDate.getMonth(),
      "day":    nowDate.getDate(),
      "hour":   nowDate.getHours(),
      "minute": nowDate.getMinutes(),
      "second": nowDate.getSeconds(),
      "millisecond" : nowDate.getMilliseconds()
    },
    start = extend({}, defaults, period.start),
    end   = extend({}, defaults, period.end),
    startDate = new Date(start.year, start.month, start.day, start.hour, start.minute, start.second, start.millisecond),
    endDate   = new Date(end.year, end.month, end.day, end.hour, end.minute, end.second, end.millisecond);
  return {
    "now":   nowDate,
    "start": startDate,
    "end":   endDate
  };
};

/**
 * Given a "period" object, return true if this should be on or not.
 * @param period
 * @returns {boolean}
 */
Channel.prototype.checkWithinPeriod = function (period) {
  var dates = this.createPeriodRange(period);

  if (dates.start <= dates.now && dates.end >= dates.now) {
    return true;
  }
  return false;
};

/**
 * Channel.Array()
 * new Channel.Array()
 *
 * Create an Array-like object instance of Channel
 *
 * @return {Channel.Array}
 */
Channel.Array = function () {
  if (!(this instanceof Channel.Array)) {
    return new Channel.Array();
  }

  this.length = 0;

  channels.forEach(function (channel, index) {
    this[index] = channel;
    this.length++;
  }, this);
};


/**
 * each Execute callbackFn for each active channel instance in an Channel.Array
 * @param  {Function} callbackFn
 * @return {Channel.Array}
 */
Channel.Array.prototype.each = function (callbackFn) {
  var channel, i, length;

  length = this.length;

  for (i = 0; i < length; i++) {
    channel = this[i];
    callbackFn.call(channel, channel, i);
  }

  return this;
};

/**
 * Allow calling certain functions on all the channels.
 */
[
  "on", "off"
].forEach(function (method) {
    // Create Channel.Array wrappers for each method listed.
    // This will allow us control over all channel instances
    // simultaneously.
    Channel.Array.prototype[method] = function () {
      var args = [].slice.call(arguments);

      this.each(function (channel) {
        Channel.prototype[method].apply(channel, args);
      });
      return this;
    };
  });

module.exports = Channel;