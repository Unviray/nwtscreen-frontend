import Skeleton from '@yisheng90/react-loading';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ajaxState } from '../utils';


function ChapButton(props) {
  let match = useRouteMatch()
  const history = useHistory()

  function click() {
    history.push(`${match.url}/${props.children}`)
  }

  const style = {
    width: "48px",
    height: "48px"
  }

  return (
    <Button variant="light" style={style} className="book-button rounded-0 fw-bold me-1 mb-1 px-0" onClick={click}>
      {props.children}
    </Button>
  )
}


export default class Book extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: <Skeleton />,
      chap_list: <Skeleton />
    }
  }

  componentDidMount() {
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
      <>
        <h1>{this.state.name}</h1>
        <div>{this.state.chap_list}</div>
      </>
    )
  }
}
