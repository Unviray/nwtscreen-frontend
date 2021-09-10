import Skeleton from '@yisheng90/react-loading'
import React, { useEffect } from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import AirplayTwoToneIcon from '@material-ui/icons/AirplayTwoTone';

import { remove, show } from '../global_state'
import { ajax } from '../utils'


const VersetCard = (props) => {
  const dispatch = useDispatch()
  const [book, setBook] = React.useState(<Skeleton />)
  const [text, setText] = React.useState(<Skeleton />)

  useEffect(() => {
    ajax(`/meta/${props.pointer.book}`, (p) => {
      setBook(p.name)
    })

    ajax(`/verset/${props.pointer.book}/${props.pointer.chapter}/${props.pointer.verset}`, (p) => {
      setText(p)
    })
  }, [props.pointer.book, props.pointer.chapter, props.pointer.verset])

  return (
    <Card className="mb-2 bg-light border-0">
      <Card.Header className="border-0 p-0 d-flex justify-content-end">
        <div className="btn-group" role="group" aria-label="Basic example">
          <Button
            variant="light"
            className="fw-bold btn-sm"
            onClick={() => { dispatch(remove(props.pointer)) }}>
            <RemoveCircleTwoToneIcon />
          </Button>
          <Button
            variant="light"
            className="fw-bold btn-sm"
            onClick={() => { dispatch(show(props.pointer)) }}>
              <AirplayTwoToneIcon />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className="fw-bold">
          {book} {props.pointer.chapter}:{props.pointer.verset}
        </Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}


const RespContainer = (props) => {
  const pointers = useSelector((state) => state.pointer.value)
  const versetCardList = []

  let i = 0
  for (let pointer of pointers) {
    versetCardList.push(<VersetCard key={i} pointer={pointer} />)
    i++
  }

  return (
    <Container>
      <Row>
        <Col lg={9}>
          {props.children}
        </Col>
        <Col lg={3}>
          <div className="sticky-top py-3">
            {versetCardList}
          </div>
        </Col>
      </Row>
    </Container>
  )
}


export default RespContainer
