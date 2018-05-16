'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emeraldJs = require('emerald-js');
var log = require('./logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeChecker = function () {
  function NodeChecker(ethRpc) {
    _classCallCheck(this, NodeChecker);

    this.ethRpc = ethRpc;
  }

  _createClass(NodeChecker, [{
    key: 'check',
    value: function check() {
      var _this = this;

      return this.exists().then(function (clientVersion) {
        return _this.getChain().then(function (chain) {
          return _extends({}, chain, {
            clientVersion: clientVersion
          });
        });
      });
    }
  }, {
    key: 'exists',
    value: function exists() {
      return this.ethRpc.web3.clientVersion();
    }
  }, {
    key: 'getChain',
    value: function getChain() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.ethRpc.eth.getBlockByNumber('0x0', false).then(function (result) {
          if (result.hash === NodeChecker.WEB_MAINNET_GENESIS) {
            resolve({ chain: 'mainnet', chainId: 101 });
          } else if (result.hash === NodeChecker.WEB_MORDEN_GENESIS) {
            resolve({ chain: 'morden', chainId: 111 });
          } else {
            resolve({ chain: 'unknown', chainId: 0 });
          }
        }).catch(function (error) {
          log.info(error);
          reject(error);
        });
      });
    }
  }]);

  return NodeChecker;
}();

NodeChecker.WEB_MAINNET_GENESIS = '0x78e066e78f30695e6c4218db4af16a670085b58e592378e864b40156b87a4c19';
NodeChecker.WEB_MORDEN_GENESIS = '0x0cd786a2425d16f152c658316c423e6ce1181e15c3295826d7c9904cba9ce303';
module.exports = { NodeChecker };