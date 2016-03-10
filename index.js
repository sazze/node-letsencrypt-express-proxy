
var request = require('request');
var url = require('url');

var ACME_REQUEST_PATH = '/.well-known/acme-challenge';

module.exports = function (proxyHost, verifyProxy) {
  var host = proxyHost;
  var verify = !!verifyProxy;

  var acmeRequestRegexp = new RegExp('^' + ACME_REQUEST_PATH);

  var proxy = function (req, res, next) {
    if (!acmeRequestRegexp.test(req.originalUrl)) {
      // not a letsencrypt request
      next();
      return;
    }

    var upstreamUrl = {
      protocol: req.protocol,
      hostname: host,
      pathname: req.originalUrl,
      query: req.query,
      method: req.method
    };

    var upstream = request({url: url.format(upstreamUrl), agentOptions: {rejectUnauthorized: verify}});

    req.pipe(upstream).pipe(res);
  };

  proxy.ACME_REQUEST_PATH = ACME_REQUEST_PATH;

  return proxy;
};