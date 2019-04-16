import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Content,
  Button,
  Container,
  Columns,
} from 'react-bulma-components'
import Loader from 'components/Loader'
import Image1 from 'assets/Image1.png'
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
      <div id="wrapper" className="admin-user">
        <Container>
          <Card style={{ zIndex: '99999' }}>
            <Card.Content>
              <Content>
                <Columns>
                  <Columns.Column size={6}>
                    <div className="mb-two">
                      <h4>Welcome to your personal landing page</h4>
                      <h1 style={{ textAlign: 'center' }}>Identity</h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={Image1} alt="" style={{ border: '1px solid #E0E3DA'}}/>
                    </div>
                  </Columns.Column>
                  <Columns.Column size={6}>
                    <div>
                      <h4 style={{ textAlign: 'center', marginBottom: '80px' }}>Why Identity?</h4>
                      <Columns>
                        <Columns.Column size={4}>
                          <h5>
                            Simplicity
                          </h5>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <h5>
                            Data ownership
                          </h5>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <h5>
                            Identity Ownership
                          </h5>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <h5>
                            Open Source
                          </h5>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <h5>
                            No Tracking
                          </h5>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <h5>
                            Blockstack powered
                          </h5>
                        </Columns.Column>
                      </Columns>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                      {
                        loading ? <Loader /> :
                        <Button onClick={this.handleSignIn} style={{ background: '#aec3cf' }}>
                          Sign in with Blockstack
                        </Button>
                      }
                    </div>
                  </Columns.Column>
                </Columns>
              </Content>
            </Card.Content>
          </Card>
        </Container>
      </div>
    )
  }
}
