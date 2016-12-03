var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/jadefiles');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index',{title: 'WebDesignZM'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// POST method route
app.post('/', function (req, res) {
	console.log('Post request!!!');
	console.log(req);
	console.log(res);
  res.send('POST request to the homepage');
});

