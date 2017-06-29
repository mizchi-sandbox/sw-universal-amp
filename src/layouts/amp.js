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
   <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
   <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
   <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
 </head>
 <body>
   <h1>mizchi's playground: Amp page with amp-bind</h1>
   <a href="${canonical}">Go to original</a>
   <hr />
   <main>${html}</main>
   <hr />
   <amp-list src="/api/data.json"
    width=300 height=200 layout=responsive>
     <template type="amp-mustache">
      <div>
        AMP: Gererated at {{at}}
      </div>
     </template>
   </amp-list>
 </body>
</html>
  `
}
