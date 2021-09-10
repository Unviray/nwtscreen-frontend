import Skeleton from '@yisheng90/react-loading';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ajaxState } from "../utils";


function BookButton(props) {
  const history = useHistory()
  function click() {
    history.push(`/${props.children.slugify()}`)
  }

  return (
    <Button variant="light" className="book-button rounded-0 flex-fill fw-bold" onClick={click}>
      {props.children}
    </Button>
  )
}


class Part extends React.Component {
  constructor(props) {
    super(props)

    let book_list = []

    for (let index = 0; index <= 66; index++) {
      book_list.push(
        <Col key={index} lg={4} xl={3} className="d-flex">
          <Skeleton key={index} height={36} />
        </Col>
      )
    }

    this.state = {
      book_list: book_list
    }
  }

  componentDidMount() {
    ajaxState(`/testament/${this.props.n}`, this, true, (p) => {
      let book_list = []
      p.forEach((element, index) => {
        book_list.push(
          <Col key={index} lg={4} xl={3} className="d-flex">
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


export default class Home extends Component {
  render() {
    return (
      <>
        <Row className="mb-3 g-1">
          <Part n={1} />
        </Row>
        <Row className="mb-3 g-1">
          <Part n={2} />
        </Row>
      </>
    )
  }
}
