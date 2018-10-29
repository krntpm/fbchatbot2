'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressRequestId = require('express-request-id');

var _expressRequestId2 = _interopRequireDefault(_expressRequestId);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _messenger = require('../app/messenger');

var _controller = require('../app/controller');

var _path2 = _interopRequireDefault(_path);

var _middlewares = require('../app/middlewares');

var _constants = require('../app/utils/constants');


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Express = function () {
    function Express(oauth, logger) {
        _classCallCheck(this, Express);

           this.logger = logger;
        this.express = (0, _express2.default)();
        this.setConfig = this.setConfig.bind(this);
        this.setLoging = this.setLoging.bind(this);         
        this.messengerView = this.messengerView.bind(this);
        this.listen = this.listen.bind(this);
        this.setView = this.setView.bind(this);
    }

    _createClass(Express, [{
        key: 'setConfig',
        value: function setConfig() {
            // generate request id
            this.express.use((0, _expressRequestId2.default)());
            // parse body params and attache them to req.body
            this.express.use(_bodyParser2.default.json());
            // extract session
            this.express.use(_middlewares.extractSession);
        }
    },  {
        key: 'setLoging',
        value: function setLoging() {
            // logging
            this.logger.setCronJobLogRotate();
            this.express.use((0, _morgan2.default)(_constants.ENV.LOGS));
            this.express.use(this.logger.logRequest);
            this.express.use(this.logger.logResponse);
        }
    }, {
        key: 'messengerView',
        value: function messengerView() {
             this.express.get('/messengerView', function (req, res, next) {
                res.render('webView.html');
                res.end();
              
            });
        }
    },{
        key: 'setView',
        value: function setView() {
            
            this.express.engine('html', _ejs2.default.renderFile);
            this.express.set('views', _path2.default.join(__dirname, '../public'));
            this.express.set('view engine', 'html');
        }
    },{
        key: 'listen',
        value: function listen() {
            this.setConfig();
            if (_constants.ENV.SAVE_LOG) {
                  this.setLoging();
              }
               new _messenger.process(this.express);
               new _controller.threadControl(this.express);
              //new _messenger.ProcessOfMessenger();
               this.messengerView();
          
           /*   if (_constants.ENV.ENV === 'production' && _constants.ENV.USE_HTTPS === true) {
                  var privateKey = _fs2.default.readFileSync(_constants.ENV.SSL_KEY, 'utf8').toString();
                  var certificate = _fs2.default.readFileSync(_constants.ENV.SSL_CERT, 'utf8').toString();
                  var credentials = { key: privateKey, cert: certificate };
                  if (_fs2.default.existsSync(_constants.ENV.SSL_CA)) {
                      var certificateAuthority = _fs2.default.readFileSync(_constants.ENV.SSL_CA, 'utf8').toString();
                      credentials.ca = certificateAuthority;
                  }
              //
                  _https2.default.createServer(credentials, this.express).listen(_constants.ENV.APP_PORT, function () {
                     
                      return console.info('server started on port ' + _constants.ENV.APP_PORT + ' (' + _constants.ENV.ENV + ')');
                  });
              } else {
                  this.express.listen(_constants.ENV.APP_PORT, function () {
                               
                      return console.info('server started on port ' + _constants.ENV.APP_PORT + ' (' + _constants.ENV.ENV + ')');
                  });}}*/
                  var port = process.env.PORT;
                  this.express.listen(port||3000, function () {
                               
                      return console.info('server started on port ' + _constants.ENV.APP_PORT || 3000 || process.env.PORT + ' (' + _constants.ENV.ENV + ')');

                }
            
    , {
        key: 'cancle',
        value: function cancle() {}
    }]);

    return Express;
}();

/**
 * Exports express
 * @public
 */


exports.default = Express;
