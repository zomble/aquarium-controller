
var Default = require('./default');

function Dimmer (opts) {
  Default.call(this, opts);
};

Dimmer.prototype = Object.create(Default.prototype);

Dimmer.prototype.run = function () {

  // Should I be on?
  if (this.checkWithinPeriod(this.opts.period)) {
    // How much should I be on. 0 - 255

    var alpha = this.intensity(this.opts.period);

    console.log(this.name);

    var min = 40;

    var intensity = parseInt(Math.round(min + alpha * (255 - min)));

    console.log(intensity);

    console.log("");

    // Using fade gives a much smoother transition.
    this.pin.brightness(intensity);
  } else {
    this.off();
  }

  return this;
};

/**
 * intensity Returns a number between 0-1 to represent the current desired intensity of this channel.
 * @param period
 * @returns {number} 0-1
 */
Dimmer.prototype.intensity = function (period) {
  //
  var dates = this.createPeriodRange(period);

  var now = dates.now.getTime()-dates.start.getTime();
  var end = dates.end.getTime()-dates.start.getTime()

  var x = ((now / end) * 2 - 1);

  var intensity = (-(Math.pow(x, 2))+1) * 1.30;

  if (intensity > 1) {
    return 1;
  }
  if (intensity < 0) {
    return 0;
  }

  return intensity;
};

module.exports = Dimmer;