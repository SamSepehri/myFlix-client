import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";

import { devToolsEnhancer } from "redux-devtools-extension";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesAPP from "./reducers/reducers";

import MainView from "./components/main-view/main-view";

import './index.scss';

const store = createStore(moviesAPP,
    devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container id="main-view">
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);