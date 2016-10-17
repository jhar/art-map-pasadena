import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducerIndex from './reducers'
import App from './containers/App'

let store = createStore(reducerIndex)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

