var stream = require('stream'),
    util   = require('util'),
    five   = require('johnny-five'),
    board  = new five.Board();

// var Dimmer = function (pin) {
//   Dimmer.super_.call(this, { objectMode: true });

//   this.pin = new five.Led({ pin: pin });
// };

// util.inherits(Dimmer, stream.Writable);

// Dimmer.prototype._write = function (intensity, enc, next) {
//   this.pin.brightness(intensity);
//   next();
// };

// var random = stream.Readable({ objectMode: true });

// random._read = function () {
//   setTimeout(function () {
//     random.push(255 * Math.random());
//   }, 100);
// };

// board.on('ready', function () {
//   var dimmer1 = new Dimmer(11);
//   var dimmer2 = new Dimmer(6);
//   var dimmer3 = new Dimmer(9);

//   random.pipe(dimmer1);
//   random.pipe(dimmer2);
//   random.pipe(dimmer3);

//   process.on('exit', function () {
//     console.log('exit');
//   });

//   process.on('SIGINT', function () {
//     console.log('sigint');

//     dimmer1.write(0);
//     dimmer2.write(0);
//     dimmer3.write(0);

//     process.exit();
//   });
// });

board.on('ready', function() {

  require('./lib/channel');

});
