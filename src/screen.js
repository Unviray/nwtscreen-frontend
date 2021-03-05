import React from "react"
import { ajaxState } from "./utils"
import { Container } from "react-bootstrap"

import "./screen.css"
import background from "./background.png"


const fontSize = (text) => {
  if (text.length >= 400) {
    return {primary: "2.5em", secondary: "2em"}
  }
  else if (text.length >= 200) {
    return {primary: "3em", secondary: "2.5em"}
  }
  else {
    return {primary: "3.5em", secondary: "3em"}
  }
}


export default class Screen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: "",
      chapter: "",
      verset: "",
      text: "",
      spell: "",
      show: true,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      ajaxState(`/show-screen`, this, true, (p) => {
        if (p !== null) {
          if ((p.book === this.state.book) &&
              (p.chapter === this.state.chapter) &&
              (p.verset === this.state.verset)) {
            return
          }
          ajaxState(`/verset/${p.book}/${p.chapter}/${p.verset}`, this, true, (p) => {
            return { text: `“${p}”` }
          })
          ajaxState(`/meta/${p.book}`, this, true, (result) => {
            return { spell: `—${result.name} ${p.chapter}:${p.verset}` }
          })
          return {
            book: p.book,
            chapter: p.chapter,
            verset: p.verset,
            show: true,
          }
        }
        else {
          return {
            // text: "",
            // book: "",
            // chapter: "",
            // verset: "",
            // spell: "",
            show: false
          }
        }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div id="screen">
        <div style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
          className={this.state.show ? 'content d-flex' : 'content d-flex hide'}>
          <div className="m-auto">
            <Container style={{
              fontSize: fontSize(this.state.text).primary,
            }} className="text-center">
              {this.state.text}
            </Container>
            <Container style={{ fontSize: fontSize(this.state.text).secondary }} className="text-right">
              <span>{this.state.spell}</span>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}
