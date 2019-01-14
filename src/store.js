import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

/***
 *
 * @params options {{
 *   devTools: Boolean,
 *   enhances: Array,
 *   initialState: *,
 *   middlewares: Array,
 *   production: Boolean,
 *   reducer: Function || Object,
 * }}
 * @returns {Promise<Store>}
 */
export const configureStore = async (options = {}) => {
  const {
    devTools = true,
    enhancers = [],
    initialState,
    middlewares = [],
    production = process.env['NODE_ENV'] === 'production',
    reducer,
  } = options

  let rootReducer
  if (typeof reducer === 'function') rootReducer = reducer
  else if (typeof reducer === 'object') rootReducer = combineReducers(reducer)
  else throw new Error('Reducer must be a function or a plain object')

  let finalCompose = compose
  if (devTools) {
    finalCompose = composeWithDevTools({ trace: !production })
  }

  const storeEnhancers = [applyMiddleware(...middlewares), ...enhancers]

  const composedEnhancer = finalCompose(...storeEnhancers)

  return createStore(rootReducer, initialState, composedEnhancer)
}
