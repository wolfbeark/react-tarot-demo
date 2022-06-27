import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// Provider : 컴포넌트, 스테이트를 어떤 컴포넌트들에게 제공할 것인가라는 것에 대한
// 가장 바깥쪽에(울타리처럼) 정의하는 것
// useSelector : 어떤 스테이트 값을 쓰고싶은지 선택하는 것
// useDispatch : 스테이트 값을 변경시킬 때 사용
// connect : 이건 잘 찾아보자. 재사용성할때 쓴다더라

const createStoreWithMiddleware =
  applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* //<BrowserRouter basename={process.env.PUBLIC_URL}> */}
          <Provider store={createStoreWithMiddleware(Reducer,
            composeWithDevTools())}>
            <App />
          </Provider>
        {/* /*</BrowserRouter>*/ }
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
