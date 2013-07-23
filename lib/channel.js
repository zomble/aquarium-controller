var five    = require('johnny-five'),
    config  = require('../config'),
    Relay   = require('./modules/relay'),
    chrono  = require('chrono-node'),
    conf    = new WeakMap();

var channels = [];

var isWithinPeriod = function (period) {
  var date = chrono.parse(period).pop();
  return date.start.date() <= Date.now() && date.end.date() >= Date.now();
};

config.forEach(function (options) {
  var module;

  // Only support relay for now
  if (options.type === 'relay') {
    channels.push(module = new Relay(options.addr));
    conf.set(module, options);
  }
});

setTimeout(function controlLoop () {
  channels.forEach(function (channel) {
    if (isWithinPeriod(conf.get(channel).opts.period)) {
      channel.on();
    } else {
      channel.off();
    }
  });

  setTimeout(controlLoop, 1000);
}, 1000);
