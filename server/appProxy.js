const { createProxyMiddleware } = require('http-proxy-middleware');

const appProxy = (server) => {
  server.use(
    '/syk/oppfolgingsplanarbeidsgiver/api/dinesykmeldte',
    createProxyMiddleware({
      target: process.env.SYKMELDINGER_ARBEIDSGIVER_URL,
      pathRewrite: {
        '^/syk/oppfolgingsplanarbeidsgiver/api/dinesykmeldte': '/api/dinesykmeldte',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );

  server.use(
    '/syk/oppfolgingsplanarbeidsgiver/api/oppfolgingsplanservice',
    createProxyMiddleware({
      target: process.env.SYFOOPPFOLGINGSPLANSERVICE_HOST,
      pathRewrite: {
        '^/syk/oppfolgingsplanarbeidsgiver/api/oppfolgingsplanservice': '/syfooppfolgingsplanservice/api',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );
};

module.exports = appProxy;
