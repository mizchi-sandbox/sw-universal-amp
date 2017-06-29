/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
      <a href="/">Top</a>
      <h2>{props.url}</h2>
      <p>Generated at {props.createdAt}</p>
    </div>
  )
})
