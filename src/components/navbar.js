import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { Button, Container, Navbar } from 'react-bootstrap'
import RemoveFromQueueTwoToneIcon from '@material-ui/icons/RemoveFromQueueTwoTone'
import DesktopWindowsTwoToneIcon from '@material-ui/icons/DesktopWindowsTwoTone'

import { hide } from '../global_state'



const MyNavbar = () => {
  const dispatch = useDispatch()
  return (
    <Switch>
      <Route path="/ecran">
      </Route>
      <Route path="/">
        <Navbar variant="light" className="bg-light mb-3">
          <Container>
            <Link to="/" className="text-decoration-none">
              <Navbar.Brand className="fw-bold">NwtScreen</Navbar.Brand>
            </Link>
            <div className="d-flex">
              <Button variant="light" onClick={() => { dispatch(hide()) }}>
                <RemoveFromQueueTwoToneIcon />
              </Button>
              <Link to="/ecran" className="btn btn-light" target="_blank">
                <DesktopWindowsTwoToneIcon />
              </Link>
            </div>
          </Container>
        </Navbar>
      </Route>
    </Switch>
  )
}


export default MyNavbar
