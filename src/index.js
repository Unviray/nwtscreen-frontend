import React from "react"
import { Provider } from 'react-redux'
import ReactDOM from "react-dom"

import "./static/css/material-icons.css"

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import "./static/css/bootstrap.min.css"
import "./static/css/material-icons.css"
import "./static/css/style.css"
import "./static/css/all.min.css"

import Navbar from "./components/navbar"
import RespContainer from "./components/resp_container"

import store from "./global_state"

import Home from "./pages/home"
import Book from "./pages/book"
import Chapter from "./pages/chapter"
import Screen from "./pages/screen"



// eslint-disable-next-line
String.prototype.slugify = function () {
  return this
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}


class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/ecran" component={Screen} />
            <Route path="/">
              <RespContainer>
                <Switch>
                  <Route path="/:book/:chapter/" component={Chapter} />
                  <Route path="/:book/" component={Book} />
                  <Route path="/" component={Home} />
                </Switch>
              </RespContainer>
            </Route>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById("root")
)
