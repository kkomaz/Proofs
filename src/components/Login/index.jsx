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
import Icon from 'components/Icon'
import IcLauncher from 'assets/ic_launcher.png'

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
                      <h1 style={{ textAlign: 'center' }}>Proofs</h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={Image1} alt="" style={{ border: '1px solid #E0E3DA' }}/>
                    </div>
                  </Columns.Column>
                  <Columns.Column size={6}>
                    <div>
                      <div style={{ marginBottom: '80px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <h4 style={{ textAlign: 'center' }}>Why Proofs?</h4>
                        <img src={IcLauncher} alt="" style={{ textAlign: 'center', width: '150px', height: '150px' }}/>
                      </div>

                      <Columns>
                        <Columns.Column size={4}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <h5 style={{ marginBottom: 0 }}>
                              Simple Design
                            </h5>
                            <Icon
                              className="icon-pencil ml-one"
                              icon="IconSmile"
                              onClick={this.openNameModal}
                              size={28}
                            />
                          </div>
                          <p style={{ fontSize: '12px', textTransform: 'inherit' }}>
                            Reduce bloat.  Keep your profile clean.
                          </p>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <h5 style={{ marginBottom: 0 }}>
                              Data ownership
                            </h5>
                            <Icon
                              className="icon-pencil"
                              icon="IconBoxRemove"
                              onClick={this.openNameModal}
                              size={28}
                            />
                          </div>
                          <p style={{ fontSize: '12px', textTransform: 'inherit' }}>
                            Own your data.  The goal is to give control to the user, not the application.
                          </p>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <h5 style={{ marginBottom: 0 }}>
                              Identity Ownership
                            </h5>
                            <Icon
                              className="icon-pencil"
                              icon="IconPerson"
                              onClick={this.openNameModal}
                              size={28}
                            />
                          </div>
                          <p style={{ fontSize: '12px', textTransform: 'inherit' }}>
                            Powered by Blockstack, you retain ownership of your identity and data.
                          </p>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <h5 style={{ marginBottom: 0 }}>
                              Open Source
                            </h5>
                            <Icon
                              className="icon-pencil ml-quarter"
                              icon="IconUnlocked"
                              onClick={this.openNameModal}
                              size={28}
                            />
                          </div>
                          <p style={{ fontSize: '12px', textTransform: 'inherit' }}>
                            <a href="https://github.com/kkomaz/Identity" target="_blank" rel="noopener noreferrer">Open source</a> to ensure code is audited properly
                          </p>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <h5 style={{ marginBottom: 0 }}>
                              No Tracking
                            </h5>
                            <Icon
                              className="icon-pencil"
                              icon="IconPencil"
                              onClick={this.openNameModal}
                              size={28}
                            />
                          </div>
                          <p style={{ fontSize: '12px', textTransform: 'inherit' }}>
                            No 3rd party tracker is injected into proofs.
                          </p>
                        </Columns.Column>
                        <Columns.Column size={4}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <h5 style={{ marginBottom: 0 }}>
                              Blockstack powered
                            </h5>
                            <Icon
                              className="icon-pencil"
                              icon="IconPencil"
                              onClick={this.openNameModal}
                              size={28}
                            />
                          </div>
                          <p style={{ fontSize: '12px', textTransform: 'inherit' }}>
                            With Blockstack, you own your data and maintain your privacy, security and freedom
                          </p>
                        </Columns.Column>
                        <Columns.Column size={12}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                              loading ? <Loader /> :
                              <Button onClick={this.handleSignIn} style={{ background: '#aec3cf' }}>
                                Sign in with Blockstack
                              </Button>
                            }
                          </div>
                        </Columns.Column>
                      </Columns>
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
