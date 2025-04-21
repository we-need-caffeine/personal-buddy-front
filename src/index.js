import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

// 리덕스
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux';
import rootReducer from './modules';
import { devToolsEnhancer } from '@redux-devtools/extension';

const store = createStore(rootReducer, devToolsEnhancer())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
