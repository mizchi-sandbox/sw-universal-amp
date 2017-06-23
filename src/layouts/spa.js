/* @flow */
export default (
  _url: string,
  title: string,
  html: string,
  state: any = undefined
) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <link rel="canonical" href="${_url}" >
    <meta charset="utf-8" >
  </head>
  <body>
    <main>${html}</main>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
        /</g,
        '\\u003c'
      )}
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>
  `
}
