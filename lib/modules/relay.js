var Default = require('./default'),
    five    = require('johnny-five'),
    util    = require('util');

var Relay = module.exports = function (pin, options) {
  this.pin = new five.Led({ pin: pin });

  Default.apply(this, arguments);
};

Relay.prototype = Object.create(Default.prototype);

Relay.prototype.on = function () {
  Default.prototype.on.call(this);

  this.pin.on();
};

Relay.prototype.off = function () {
  Default.prototype.off.call(this);

  this.pin.off();
};
