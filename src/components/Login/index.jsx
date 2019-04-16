import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Content,
  Button
} from 'react-bulma-components'
import Loader from 'components/Loader'

export default class Login extends Component {
  state = {
    loading: false
  }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
  }

  handleSignIn = (e) => {
    const { userSession } = this.props
    e.preventDefault()
    userSession.redirectToSignIn()
    this.setState({ loading: true })
  }

  render() {
    const { loading } = this.state

    return (
      <Card style={{ zIndex: '99999' }}>
        <Card.Content>
          <Content>
            {
              loading ? <Loader /> :
              <Button color="primary" onClick={this.handleSignIn} style={{ color: 'white !important'}}>
                Sign in with Blockstack
              </Button>
            }
          </Content>
        </Card.Content>
      </Card>
    )
  }
}
