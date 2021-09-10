import Skeleton from '@yisheng90/react-loading'
import React, { Component, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { add } from '../global_state'
import { ajax } from '../utils'


class Verset extends Component {
  render() {
    return (
      <p id={this.props.id} onClick={this.props.onClick}>
        <span className="fw-bold">{this.props.id}</span> {this.props.children}
      </p>
    )
  }
}


const Chapter = (props) => {

  const dispatch = useDispatch()
  const [name, setName] = React.useState(<Skeleton />)
  const [verset_list, setVerset_list] = React.useState(<Skeleton />)
  const book = props.match.params.book
  const chapter = props.match.params.chapter

  useEffect(() => {
    const handleClick = (event) => {
      dispatch(add({
        book: book,
        chapter: chapter,
        verset: event.target.id,
      }))
    }

    ajax(`/meta/${book}`, (p) => {
      setName(p.name)
    })

    ajax(`/verset/${book}/${chapter}`, (p) => {
      let verset_list = []

      for (const verset_id in p) {
        const element = p[verset_id]
        verset_list.push(
          <Verset key={verset_id} id={verset_id} onClick={handleClick}>
            {element}
          </Verset>
        )
      }
      setVerset_list(verset_list)
    })
  }, [book, chapter, dispatch])

  return (
    <>
      <h1>
        {name} <span className="text-black-50">{chapter}</span>
      </h1>
      <div>
        {verset_list}
      </div>
    </>
  )
}

export default Chapter
