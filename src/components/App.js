/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import strategies from '../strategies'

const mapStateToProps = state => state

const fetchUrlState = async (url: string) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'applicaiton/json' }
  })
  return await res.json()
}

export default connect(mapStateToProps)(function App(props: any) {
  return (
    <div>
      <h1>{props.url}</h1>
      <p>{props.createdAt}</p>
    </div>
  )
})
