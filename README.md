# Featherweight Store

Configure and create Redux store with ease.

### Setup

```bash
npm install @featherweight/store
```

### API

```js
function configureStore({
  reducer: Object<string, Reducer> | Reducer,
  middlewares: Array<Middleware>,
  initialState: State,
  enhancers: Array<StoreEnhancer>,
  devTools: boolean,
  production: boolean,
})
```

**`reducer: Object<string, Reducer> | Reducer`**
An object with slice reducers or just a reducer function (**required**).

**`middlewares: Array<Middleware>`**
An array of Redux middlewares. Default to `[]`

**`initialState: State`**
Initial state that will be passed to `createStore`

**`enhancers: Array<StoreEnhancer>`**
Enhancers to apply. Defaults to `[]`

**`devTools: boolean`**
Indicates if Redux DevTools should be enabled. Defaults to `true`.

**`production: boolean`**
When `true` disables development-only features. By default will check `process.env.NODE_ENV`.

#### Basic example

```js
import { configureStore } from '@featherweight/store'

const count = (state = 0, action) => {
  if (action.type === 'inc') return state + 1
  return state
}

const store = configureStore({ reducer: { count } })
```

#### Advanced example

```js
import { configureStore } from '@featherweight/store'
import thunk from 'redux-thunk'

import { isDevelopment } from 'config'
import { preloadState, rootReducer } from 'app'

const store = configureStore({
  devTools: isDevelopment,
  enhancers: [
    /* e.g. your custom store enhancers */
  ],
  initialState: preloadState(),
  middlewares: [thunk],
  production: !isDevelopment,
  reducer: rootReducer,
})
```
