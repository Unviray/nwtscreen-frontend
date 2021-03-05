import React from "react"
import Skeleton from "@yisheng90/react-loading"
import { ajaxState, ajaxPOST } from "./utils"

import { Container, Row, Col } from "react-bootstrap"


class Verset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: true,
      className: "",
    }
  }

  makeInactive() {
    this.setState({
      active: false,
      className: "text-black-50"
    })
  }

  makeActive() {
    this.setState({
      active: true,
      className: ""
    })
  }

  render() {
    return (
      <p onClick={this.props.onClick}
        className={this.state.className}
        id={this.props.id}
        style={{ transition: "color 300ms cubic-bezier(0.4, 0.0, 0.2, 1)" }}>
        <span className="font-weight-bold mr-2">{this.props.id}</span>
        {this.props.children}
      </p>
    )
  }
}


export default class Chapter extends React.Component {
  constructor(props) {
    super(props)
    this.ChildElement = []
    this.ChildSelected = null
    this.state = {
      name: <Skeleton />,
      verset_list: <Skeleton />,
    }

    this.book = this.props.match.params.book
    this.chapter = this.props.match.params.chapter

    ajaxState(`/meta/${this.book}`, this, true, (p) => {
      return { name: p.name }
    })

    ajaxState(`/verset/${this.book}/${this.chapter}`, this, true, (p) => {
      let verset_list = []
      for (const verset_id in p) {
        const element = p[verset_id]
        const ref = React.createRef()
        this.ChildElement.push(ref)
        verset_list.push(
          <Verset key={verset_id} id={verset_id} ref={ref} onClick={this.handleClick(this)}>
            {element}
          </Verset>
        )
      }

      return { verset_list: verset_list }
    })
  }

  handleClick(self) {
    function selecter(e) {
      const allElement = self.ChildElement
      const childElement = self.ChildElement[e.target.id - 1]

      if (self.ChildSelected === childElement) {
        allElement.forEach(element => {
          element.current.makeActive()
        })

        self.ChildSelected = null
      }
      else {
        allElement.forEach(element => {
          element.current.makeInactive()
        })

        childElement.current.makeActive()
        self.ChildSelected = childElement
      }
    }

    function showScreen(e) {
      if (self.ChildSelected) {
        ajaxPOST("/show-screen", {
          book: self.book,
          chapter: self.chapter,
          verset: e.target.id
        })
      }
      else {
        ajaxPOST("/clear-screen")
      }
    }

    return e => {
      selecter(e)
      showScreen(e)
    }
  }

  render() {
    return (
      <Container className="mt-3" fluid>
        <Row>
          <Col md={9} className="px-5">
            <h1>
              {this.state.name} <span className="text-black-50">{this.props.match.params.chapter}</span>
            </h1>
            <div>
              {this.state.verset_list}
            </div>
          </Col>
          <Col md={3} className="bg-light">
          </Col>
        </Row>
      </Container>
    )
  }
}
