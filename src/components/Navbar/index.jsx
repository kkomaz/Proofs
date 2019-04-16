import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'react-bulma-components'
import { withRouter } from 'react-router-dom'

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
        color="primary"
        fixed="top"
        active={open}
      >
        <Navbar.Brand>
          <Navbar.Item>
            <p>Identity</p>
          </Navbar.Item>

          <Navbar.Burger onClick={this.toggleNavBar} />
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Container position="end">
            {
              isSignedIn &&
              <React.Fragment>
                <Navbar.Item onClick={this.goToAdminPage}>
                  Admin Page
                </Navbar.Item>
                <Navbar.Item onClick={this.goToPublicPage}>
                  Public Page
                </Navbar.Item>
                <Navbar.Item onClick={this.handleSignOut}>
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
