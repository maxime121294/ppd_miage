// Load .env for development environments
var dotenv = require('dotenv');
dotenv._getKeysAndValuesFromEnvFilePath('process.env');
dotenv._setEnvs();

// Initialise New Relic if an app name and license key exists
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
	require('newrelic');
}

/**
 * Application Initialisation
 */

var keystone = require('keystone'),
	pkg = require('./package.json');

keystone.init({

	'name': 'Miage',
	'brand': 'Miage',
	'back': '/me',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'jade',
	'view cache': false,

	'emails': 'templates/emails',

	'auto update': true,
	'mongo': process.env.MONGO_URI || 'mongodb://miage2015:DXR746sru@ds033469.mongolab.com:33469/mymongodb',

	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'sydjs',

	'mandrill api key': process.env.MANDRILL_KEY,

	'google api key': process.env.GOOGLE_BROWSER_KEY,
	'google server api key': process.env.GOOGLE_SERVER_KEY,
	'default region' : process.env.GOOGLE_DEFAULT_REGION,

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN,

	'basedir': __dirname

});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.set('locals', {
	_: require('underscore'),
	moment: require('moment'),
	js: 'javascript:;',
	env: keystone.get('env'),
	utils: keystone.utils,
	plural: keystone.utils.plural,
	editable: keystone.content.editable,
	google_api_key: keystone.get('google api key'),
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('email locals', {
	utils: keystone.utils,
	host: (function() {
		if (keystone.get('env') === 'staging') return 'http://sydjs-beta.herokuapp.com';
		if (keystone.get('env') === 'production') return 'http://www.sydjs.com';
		return (keystone.get('host') || 'http://localhost:') + (keystone.get('port') || '3000');
	})()
});

keystone.set('nav', {
	'meetups': ['meetups', 'talks', 'rsvps'],
	'members': ['users', 'organisations'],
	'posts': ['posts', 'post-categories', 'post-comments'],
	'links': ['links', 'link-tags', 'link-comments'],
	'documents': ['docs']
});

keystone.set('cloudinary config', { cloud_name: 'dju6hmeeg', api_key: '693682562797643', api_secret: 'G11UdtGexbdXsRsWgX2KEw3rcT4' });
keystone.set('cloudinary config', 'cloudinary://693682562797643:G11UdtGexbdXsRsWgX2KEw3rcT4@dju6hmeeg' );

keystone.start();
