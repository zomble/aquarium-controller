var five = require('johnny-five')
  , config = require('../config')
  , channels = require('../lib/channels')
  , board = new five.Board();

var controlLoop = function () {

  var all = channels.Default.Array();

  all.forEach(function(channel, i) {
    channel.run();
  });

  console.log('End Loop');
  setTimeout(controlLoop, 1000);
};

board.on('ready', function() {

  for(i=0;++i<16;) {
    this.pinMode(i, 1);
    this.digitalWrite(i, 1);
  }

  // Load config into real objects.
  for (var i in config) {
    var opts = config[i];
    switch(opts.type) {
      case 'dimmer':
        new channels.Dimmer(opts);
        break;
      case 'relay':
        new channels.Relay(opts);
        break;
      default:
        new channels.Default(opts);
    }
  }

  // Always off by default.
  var all = channels.Default.Array();
  all.forEach(function (channel, index) {
    channel.off();
  });

  console.log('Set up complete.');
  controlLoop();
});
