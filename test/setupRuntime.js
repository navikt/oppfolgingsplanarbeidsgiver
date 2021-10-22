require('core-js/stable');
require('regenerator-runtime/runtime');
require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx']});
require('jsdom-global')('<!doctype html><html><body></body></html>', {
  url: 'https://example.org/',
});
