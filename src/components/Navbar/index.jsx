import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'react-bulma-components'
import { withRouter } from 'react-router-dom'
import './navbar.scss'

export class NavbarComp extends Component {
  state = {
    open: false,
    user: {}
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { userSession } = this.props

    if (userSession.isUserSignedIn()) {
      const user = userSession.loadUserData()
      this.setState({ user })
    }
  }

  handleSignOut = () => {
    const { userSession } = this.props
    userSession.signUserOut()
    window.location = '/'
  }

  toggleNavBar = () => {
    this.setState({ open: !this.state.open })
  }

  goToAdminPage = () => {
    const { history } = this.props
    const { user } = this.state

    return history.push(`/app/${user.username}`)
  }

  goToPublicPage = () => {
    const { history } = this.props
    const { user } = this.state

    return history.push(`/${user.username}`)
  }

  render() {
    const { userSession } = this.props
    const { open } = this.state
    const isSignedIn = userSession.isUserSignedIn()

    return (
      <Navbar
        fixed="top"
        active={open}
        style={{
          background: '#aec3cf',
          color: 'white'
        }}
      >
        <Navbar.Brand>
          <Navbar.Item className="identity-navbar-item">
            Identity
          </Navbar.Item>

          <Navbar.Burger onClick={this.toggleNavBar} />
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Container position="end">
            {
              isSignedIn &&
              <React.Fragment>
                <Navbar.Item onClick={this.goToAdminPage} className="identity-navbar-item">
                  Admin Page
                </Navbar.Item>
                <Navbar.Item onClick={this.goToPublicPage} className="identity-navbar-item">
                  Public Page
                </Navbar.Item>
                <Navbar.Item onClick={this.handleSignOut} className="identity-navbar-item">
                  Sign Out
                </Navbar.Item>
              </React.Fragment>
            }
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    )
  }
}

export default withRouter(NavbarComp)
