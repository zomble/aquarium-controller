var express = require('express')
  , Handlebars = require('handlebars')
  , exphbs = require('express3-handlebars')
  , app = express()
  , channels = require('../lib/channels')
  , hbs;

hbs = exphbs.create({
  layoutsDir: __dirname+'/views/layouts',
  partialsDir:  __dirname+'/views/partials',
  defaultLayout: 'main',
  helpers: {
    renderPartial: function(templateName) {
      console.log(templateName);
      return Handlebars.render(templateName, this);
    }
  },
  extname: ".hbs"
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));

app.get('/', function (req, res) {
  var allChannels = channels.Default.all();

  res.render('home', {
    title: 'index thing',
    channels: allChannels
  });
});

app.listen(3000);
console.log('Express server listening on port 3000');
