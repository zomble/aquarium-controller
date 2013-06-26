var express = require('express')
  , cons = require('consolidate')
  , app = express()
  , channels = require('../lib/channels');

app.engine('mustache', cons.mustache);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.set('partials', {
  doc: __dirname + '/views/doc.mustache'
});
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var allChannels = channels.Default.Array();
  res.render('index', {
    title: 'index',
    channels: allChannels
  });
});

app.listen(3000);
console.log('Express server listening on port 3000');
