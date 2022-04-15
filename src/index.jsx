import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import MainView from "./components/main-view/main-view";
import './index.scss';
import { devToolsEnhancer } from 'redux-devtools-extension';

// const store = createStore(moviesApp);
const store = createStore(moviesApp, devToolsEnhancer());


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

// Tells React ti render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);