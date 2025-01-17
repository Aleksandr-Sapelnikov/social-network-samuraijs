import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store.ts";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
let rerenderEntireTree = (state) => {

    root.render(
        <BrowserRouter>
            <Provider store={store}>
            <App  />
            </Provider>
        </BrowserRouter>);
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
