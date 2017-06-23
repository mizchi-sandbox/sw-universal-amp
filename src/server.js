/* @flow */
import url from 'url'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import createStore from './store'
import App from './components/App'
import AmpLayout from './layouts/amp.js'
import SpaLayout from './layouts/spa'

function renderPage(url, state: any, opts: { amp?: boolean } = {}) {
  const title = 'article:' + state.id
  const html = ReactDOMServer.renderToString(
    <Provider store={createStore(state)}>
      <App />
    </Provider>
  )
  return !!opts.amp
    ? AmpLayout(url, title, html)
    : SpaLayout(url, title, html, state)
}

const loadState = input => {
  return {
    url: input.url,
    createdAt: Date.now()
  }
}

const server = express()
// middleware
server.use(express.static(__dirname + '/../public'))
// load params
server.use(async (req, res, next) => {
  const params = await loadState({ url: req.url })
  req.builtParams = params
  next()
})

server.get('/api/article/:id', (req, res) => {})

server.get('/article/:id/amp', (req, res) => {
  const initialState = req.builtParams
  const html = renderPage(
    req.url,
    { ...initialState, ...req.params },
    { amp: true }
  )
  res.setHeader('content-type', 'text/html')
  res.send(html)
})

server.get('/article/:id', (req, res) => {
  const initialState = req.builtParams
  if (req.headers['content-type'] === 'applicaiton/json') {
    res.setHeader('content-type', 'applicaiton/json')
    return res.send(initialState)
  }
  const html = renderPage(req.url, { ...initialState, ...req.params })
  res.setHeader('content-type', 'text/html')
  res.send(html)
})

server.listen(9999, () => {
  console.log('server started:', 9999)
})
