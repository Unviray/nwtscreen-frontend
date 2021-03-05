import "./static/css/bootstrap.min.css"
import "./static/css/material-icons.css"
import "./static/css/style.css"
import "./static/css/all.min.css"

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import Navbar from "./component/navbar"
import React from "react"
import ReactDOM from "react-dom"

import Home from "./home"
import Book from "./book"
import Chapter from "./chapter"
import Screen from "./screen"


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
      <Router>
        <Navbar />
        <Switch>
          <Route path="/ecran" component={Screen}/>
          <Route path="/:book/:chapter/" component={Chapter}/>
          <Route path="/:book/" component={Book}/>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById("root")
)
