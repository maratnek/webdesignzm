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
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "6Le9pg0UAAAAALT4rTdbTawJuY0AAzcsSP6GK4qX";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });
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
  res.send('POST request to the homepage');
	// res.redirect(303, '/footer');
	// res.redirect(303, '/thank-you.html');
});

