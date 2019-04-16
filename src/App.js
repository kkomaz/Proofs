import React, { Component } from 'react';
import 'stylesheets/main.scss';
import { Container } from 'react-bulma-components'
import { appConfig } from 'utils/constants'
import { UserSession } from 'blockstack'
import Login from 'components/Login'
import NavbarComp from 'components/Navbar'
import Routes from 'pages/routes'

class App extends Component {
  state = {
    userSession: new UserSession({ appConfig })
  }

  componentDidMount = async () => {
    const { userSession } = this.state

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()

      if (!userData.username) {
        throw new Error('This app requires a username')
      }

      window.location = '/'
    }
  }

  render() {
    const { userSession } = this.state

    return (
      <div className="App">
        {
          userSession.isUserSignedIn() ?
          <React.Fragment>
            <NavbarComp userSession={userSession} />
            <Container>
              <Routes userSession={userSession} /> :
            </Container>
          </React.Fragment> :
          <Login userSession={userSession} />
        }
      </div>
    );
  }
}

export default App;
