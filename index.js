var express = require('express');
var app = express();
var simple_recaptcha = require('simple-recaptcha-new');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/jadefiles');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index',{title: 'WebDesignZM'});
});

app.get('/footer', function(request, response) {
  response.render('footer',{title: 'WebDesignZM'});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.use(require('body-parser').urlencoded({extended:true}));

// Send Email Nodemailer
// var credentials = require('./credentials.js')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mailTransport = nodemailer.createTransport(
  smtpTransport({
    service: 'Yandex',
    auth: {
      user: 'zm@webdesignzm.com',
      pass: 'fzntkrjhcb1904'
    }
  })
);

mailTransport.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

function sendMail(mess_text){
  mailTransport.sendMail(
    {
      from: 'zm@webdesignzm.com',
      to: 'marzab.22@yandex.ru', subject: 'You offer with WebDesignZM',
      text: 'Fank-you for you offer!',
      html: mess_text
    }, 
    function(err){
      if(err) return console.error('Not send letter: ' + err);
    }
  );
}

// POST method route
app.post('/', function (req, res) {
	console.log('Post request!!!');

  var privateKey = '6Le9pg0UAAAAALT4rTdbTawJuY0AAzcsSP6GK4qX'; // your private key here 
  var response = req.body['g-recaptcha-response'];
  console.log(response);
      
  simple_recaptcha(privateKey, response, function(err) {
    if (err){ 
	    console.log(err);
    	return res.send(err.message);
    }
    console.log('verified');
    console.log(req.body['Name']);
    console.log(req.body['Email']);
    var html_text = 
    '<h4>'+ req.body['Email'] +
    '<h4>'+ req.body['Name'] +
    '<p>' + req.body['Area'];
    sendMail(html_text);
    res.redirect(303, '/');
  });


	// if (req.xhr || req.accepts('json,html') === 'json') {
	// 	console.log('success');
	// 	console.log('Form ' + req.query.form);
	// 	console.log('  ' + req.body.name);
	// 	console.log('  ' + req.body.city);

	// 	// res.send({success:true});
	// } else {
	// 	console.log('redirect');
	// 	res.redirect(303, '/thank-you');
	// }
 //  res.send('POST request to the homepage');
	// res.redirect(303, '/footer');
	// res.redirect(303, '/thank-you.html');
});

