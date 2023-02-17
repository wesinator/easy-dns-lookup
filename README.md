# Easy DNS

A browser addon to do DNS lookups in the browser.

#### Notes and known issues:
 - Some DNS-over-HTTPS servers don't have an [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin) response header, preventing the response from loading.
 - The Google DNS option uses Google's `/resolve` endpoint, which may have slightly different formatting than other servers.

License: LGPL-3.0

#### Credits:
 - options page based on that from https://github.com/maurermj08/open-in-cyber-chef-firefox
 - Icons are from [Ubuntu Yaru theme](https://github.com/ubuntu/yaru.git), licensed CC BY-SA 4.0
