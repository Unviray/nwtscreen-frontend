import React from "react"
import Skeleton from "@yisheng90/react-loading"
import { ajaxState } from "./utils"
import { Button } from "react-bootstrap"
import {
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"


function ChapButton(props) {
  let match = useRouteMatch()
  const history = useHistory();

  function click() {
    history.push(`${match.url}/${props.children}`)
  }

  return (
    <Button variant="secondary" className="rounded-0 mr-1 mb-1 px-0" style={{ width: "48px", height: "48px" }} onClick={click}>
      {props.children}
    </Button>
  )
}


export default class Book extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: <Skeleton />,
      chap_list: <Skeleton />
    }

    ajaxState(`/meta/${this.props.match.params.book}`, this, true, (p) => {
      let chap_list = []
      for (let i = 1; i <= p.chapter_number; i++) {
        chap_list.push(
          <ChapButton key={i}>{i}</ChapButton>
        )
      }

      return {
        name: p.name,
        chap_list: chap_list
      }
    })
  }

  render() {
    return (
      <Container className="mt-3" fluid>
        <Row>
          <Col md={9} className="px-5">
            <h1>
              {this.state.name}
            </h1>
            <div>
              {this.state.chap_list}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
