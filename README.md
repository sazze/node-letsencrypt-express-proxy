## letsencrypt-express-proxy

Allows another server to handle letsencrypt certificate requests for domains that resolve to the server running this middleware.

This allows LetsEncrypt certificates to be managed automatically in environments where it is not practical to perform certificate management on the same servers that the domain names resolve to.

For example, the `StandAlone` LetsEncrypt method could be employed via a cronjob from a server dedicated to managing LetsEncrypt certificates and the application servers could use this module to route the certificate requests to this dedicated server.

### Install

```bash
npm install --save letsencrypt-express-proxy
```

### Usage

To send all LetsEncrypt certificate requests to `le-server.example.com` for processing:

```javascript
var leProxy = require('letsencrypt-express-proxy')('le-server.example.com');
var app = require('express')();

app.use(leProxy);

...
```

**IMPORTANT:** this should be the **FIRST middleware** added to express (or as close to the first as possible)
