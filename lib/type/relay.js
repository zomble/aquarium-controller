
var Default = require('./default');

function Relay (opts) {
  Default.call(this, opts);
};

Relay.prototype = Object.create(Default.prototype);

Relay.prototype.run = function () {

  // Should I be on?
  if (this.checkWithinPeriod(this.opts.period)) {
    this.off(); // Not sure why inverse? In theory this should "on" :S
  } else{
    this.on(); // inverse
  }

  return this;
};

module.exports = Relay;
