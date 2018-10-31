'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransferToSMM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/service');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransferToSMM = exports.TransferToSMM = function (_Service) {
    _inherits(TransferToSMM, _Service);

    function transferToSMM(intent) {
        _classCallCheck(this, TransferToSMM);

       var _this = _possibleConstructorReturn(this, (TransferToSMM.__proto__ || Object.getPrototypeOf(TransferToSMM)).call(this, _constants.ENV.BASE_API_MYAIS));
       _this.intent('transfer');
       _this.channel('FB');
       _this.term(intent);
       return _this;
   }
   _createClass(responseMessenger, [{ 

    key: 'callAPIEngine',
        value: function callSendAPI(psid) {
            if (!path) {
                console.error('No endpoint specified on Messenger send!');
                return;
            }
            _this.setBody({ 
                userId: '11111111111',
                ccid : psid,
                state:'transfer',
                channel : "FB"
            });
            var resBalance = new _services.CheckBalance(mobileNo).request();

        }

   }]);



}