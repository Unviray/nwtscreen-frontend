import React from "react"

// import { Link } from "react-router-dom"


import Skeleton from "@yisheng90/react-loading"

import { Container, Row, Col } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { ajaxState } from "./utils"


function BookButton(props) {
  const history = useHistory();
  function click() {
    history.push(`/${props.children.slugify()}`)
  }

  return (
    <Button block variant="secondary" className="rounded-0" onClick={click}>
      {props.children}
    </Button>
  )
}


class Testament extends React.Component {
  constructor(props) {
    super(props)

    let book_list = []

    for (let index = 0; index <= 66; index++) {
      book_list.push(
        <Col lg={4} xl={3} className="mb-2 px-1">
          <Skeleton key={index} height={36} />
        </Col>
      )
    }

    this.state = {
      book_list: book_list
    }

    ajaxState(`/testament/${this.props.n}`, this, true, (p) => {
      let book_list = []
      p.forEach((element) => {
        book_list.push(
          <Col lg={4} xl={3} className="mb-2 px-1">
            <BookButton>{element}</BookButton>
          </Col>
        )
      })

      return { book_list: book_list }
    })
  }

  render() {
    return this.state.book_list
  }
}


export default function Home() {
  return (
    <Container className="mt-3" fluid>
      <Row>
        <Col lg={9} className="px-5">
          <Row className="mb-3">
            <Testament n={1} />
          </Row>
          <Row className="mb-3">
            <Testament n={2} />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
