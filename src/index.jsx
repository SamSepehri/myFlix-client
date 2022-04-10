import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";

import { MainView } from "./components/main-view/main-view";

import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Container id="main-view">
                <MainView />
            </Container>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React ti render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);