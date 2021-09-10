import { useEffect, useState } from "react"

import { Container } from "react-bootstrap"

import "../static/css/screen.css"
import background from "../static/img/background.png"

import { ajax } from "../utils"


const Screen = (props) => {
  const [pointer, setPointer] = useState()
  const [text, setText] = useState("")
  const [spell, setSpell] = useState("")
  const [show, setShow] = useState(false)

  const fontSize = (text, mini = false) => {
    if (!mini) {
      if (text.length >= 400) {
        return { primary: "2.5em", secondary: "2em" }
      }
      else if (text.length >= 200) {
        return { primary: "3em", secondary: "2.5em" }
      }
      else {
        return { primary: "3.5em", secondary: "3em" }
      }
    }
    else {
      if (text.length >= 400) {
        return { primary: "0.75em", secondary: "0.6em" }
      }
      else if (text.length >= 200) {
        return { primary: "0.9em", secondary: "0.75em" }
      }
      else {
        return { primary: "1.05em", secondary: "0.9em" }
      }
    }
  }

  useEffect(() => {
    if (pointer) {
      ajax(`/verset/${pointer.book}/${pointer.chapter}/${pointer.verset}`, (p) => {
        setText(p)
        setShow(true)
      })
      ajax(`/meta/${pointer.book}`, (p) => {
        setSpell(`—${p.name} ${pointer.chapter}:${pointer.verset}`)
      })
    }
    else {
      setShow(false)
    }
  }, [pointer])

  useEffect(() => {
    setInterval(() => {
      ajax("/screen", (p) => {
        setPointer(p)
      })
    }, 1000)
  }, [])

  return (
    <div id="screen">
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
        className={show ? 'content d-flex' : 'content d-flex hide'}>
        <div className="d-flex flex-column m-auto">
          <Container style={{
            fontSize: fontSize(text).primary,
          }} className="text-center">
            {text}
          </Container>
          <Container style={{ fontSize: fontSize(text).secondary }} className="d-flex">
            <span className="ms-auto">{spell}</span>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default Screen
