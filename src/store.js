/* @flow */
import { createStore } from 'redux'

export type State = {
  url: string,
  createdAt: number
}

const rootReducer = (state: State, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

export default (initialState: State) => createStore(rootReducer, initialState)
