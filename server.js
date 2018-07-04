var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static(__dirname + '/dist/AngularAdminPanel'));

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/AngularAdminPanel', 'index.html'))
});

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Example listening on port 3000!');
});
const forceSSL = function () {
	return function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
				['https://', req.get('Host'), req.url].join('')
			);
		}
		next();
	}
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
module.exports = app;
