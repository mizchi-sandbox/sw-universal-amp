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

async function renderPage(state: any, opts: { amp?: boolean } = {}) {
  const url = state.url
  const title = 'article:' + state.id
  const html = ReactDOMServer.renderToString(
    <Provider store={createStore(state)}>
      <App />
    </Provider>
  )
  return !!opts.amp
    ? AmpLayout(url, title, html, state)
    : SpaLayout(url, title, html, state)
}

const loadState = input => {
  return {
    url: input.url,
    createdAt: Date.now()
  }
}

const defineRouteWithAmp = (server, pattern) => {
  server.get(`/${pattern}.json`, (req, res) => {
    const initialState = { ...req.builtParams, ...req.params }
    res.setHeader('content-type', 'applicaiton/json')
    res.send(initialState)
  })

  server.get(`/${pattern}`, async (req, res) => {
    const initialState = { ...req.builtParams, ...req.params }
    const html = await renderPage(initialState)
    res.setHeader('content-type', 'text/html')
    res.send(html)
  })

  server.get(`/amp/${pattern}`, async (req, res) => {
    const initialState = { ...req.builtParams, ...req.params }
    const html = await renderPage(initialState, { amp: true })
    res.setHeader('content-type', 'text/html')
    res.send(html)
  })
}

const server = express()
// middleware
server.use(express.static(__dirname + '/../public'))

// load params
server.get(`/api/data.json`, (req, res) => {
  res.send({
    items: [
      {
        at: Date.now()
      }
    ]
  })
})

server.use(async (req, res, next) => {
  const params = await loadState({ url: req.url })
  req.builtParams = params
  next()
})

defineRouteWithAmp(server, 'article/:id')

server.listen(9999, () => {
  console.log('server started:', 9999)
})
