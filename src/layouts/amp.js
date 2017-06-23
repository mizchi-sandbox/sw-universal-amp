/* @flow */
import url from 'url'
export default (_url: string, title: string, html: string) => {
  const parsedUrl: any = url.parse(_url)
  const canonical = parsedUrl.pathname.replace('/amp', '')
  return `<!DOCTYPE html>
<html amp>
 <head>
   <meta charset="utf-8">
   <title>${title}</title>
   <link rel="canonical" href="${canonical}" >
   <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>
   <h1>This is Amp page</h1>
   <a href="${canonical}">Go to original</a>
   <hr />
   <main>${html}</main>
 </body>
</html>
  `
}
