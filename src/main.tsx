import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from './styles/GlobalStyles'
import { Provider } from 'react-redux'
import App from './App'
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './components/Loading'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
      <Router>
        <GlobalStyles />
        <App />
      </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
