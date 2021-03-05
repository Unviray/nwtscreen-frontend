import React from "react"

import {
  Switch,
  Route,
  Link,
} from "react-router-dom"

import { Container } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import { Row, Col } from "react-bootstrap"
import { Form, Button, FormControl } from "react-bootstrap"


class Search extends React.Component {
  render() {
    return (
      <Form className="btn-group d-flex" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        <Button className="btn-light text-dark shadow-none my-sm-0 d-flex rounded-0"
          type="submit"
          style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          <i className="material-icons">search</i>
        </Button>
        <FormControl className="border-0 text-white rounded-0 pl-0" placeholder="Hitady"
          style={{ boxShadow: "0 0 0 0rem rgba(13,110,253,0)", backgroundColor: "rgba(0, 0, 0, 0.05)" }} />
      </Form>
    )
  }
}


class ToolBar extends React.Component {
  render() {
    return (
      <div className="d-flex ml-auto">
        <Link to="/ecran" className="btn btn-light d-flex mr-1" target="_blank">
          <i className="material-icons">desktop_windows</i>
          {/* <i className="fab fa-monitor"></i> */}
        </Link>
        <Button className="btn-light d-flex mr-1">
          <i className="material-icons">history</i>
        </Button>
        <Button className="btn-light d-flex">
          <i className="material-icons">bookmark</i>
        </Button>
      </div>
    )
  }
}


export default function MyNavbar() {
  return (
    <Switch>
      <Route path="/ecran">
      </Route>
      <Route path="/">
        <div className="shadow bg-light sticky-top">
          <Container className="py-2" fluid>
            <Row>
              <Col lg={9} md={8} sm={7} className="d-flex px-5">
                <Link to="/" className="text-dark">
                  <Navbar.Brand as="h1" className="mb-0">EBaiboly</Navbar.Brand>
                </Link>
                <ToolBar />
              </Col>
              <Col lg={3} md={4} sm={5} className="px-sm-0">
                <Search />
              </Col>
            </Row>
          </Container>
        </div>
      </Route>
    </Switch>
  )
}
