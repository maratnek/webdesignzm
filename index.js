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

app.use(require('body-parser').urlencoded({extended:true}));

// POST method route
app.post('/', function (req, res) {
	console.log('Post request!!!');
	// console.log(req);
	// console.log(res);
	// console.log(req.sity);
	if (req.xhr || req.accepts('json,html') === 'json') {
		console.log('success');
		console.log('Form' + req.query.form);
		console.log('  ' + req.body.name);
		console.log('  ' + req.body.city);
		// res.send({success:true});
	} else {
		console.log('redirect');
		res.redirect(303, '/thank-you');
	}
	res.redirect(303, '/footer');
	// res.redirect(303, '/thank-you.html');
  // res.send('POST request to the homepage');
});

