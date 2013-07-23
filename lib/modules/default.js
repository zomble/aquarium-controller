var Default = module.exports = function (address, options) {
  this.off();
};

Default.prototype.pin = null;

Default.prototype.on = function () {
  this._state = true;
};

Default.prototype.off = function () {
  this._state = false;
};

Default.prototype.toggle = function () {
  this._state ? this.off() : this.on();
};
