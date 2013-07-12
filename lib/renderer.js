
function ChannelRenderer (channel) {
  this.channel = channel;
};

ChannelRenderer.prototype.run = function () {

  // Should I be on?
  if (this.checkWithinPeriod(this.opts.period)) {
    this.off(); // Not sure why inverse? In theory this should "on" :S
  } else{
    this.on(); // inverse
  }

  return this;
};

module.exports = Relay;
