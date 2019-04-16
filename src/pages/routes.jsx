import React, { Component } from 'react'
import _ from 'lodash'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserProvider from 'components/User/UserProvider'
import Loader from 'components/Loader'
import AdminUser from 'components/AdminUser'

class Routes extends Component {
  state = { user: {} }

  componentDidMount() {
    const { userSession } = this.props

    const user = userSession.loadUserData()

    this.setState({ user })
  }

  render() {
    const { user } = this.state
    const { userSession } = this.props

    if (_.isEmpty(user)) {
      return <Loader />
    }

    return (
      <UserProvider userSession={userSession}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={`/app/${user.username}`}/>}
          />
          <Route
            path="/app/:username"
            render={({ match }) =>
              <AdminUser match={match} />
            }
          />
          <Route
            path="/:username"
            render={({ match }) => <div>Hello World</div>}
          />
        </Switch>
      </UserProvider>
    )
  }
}

export default Routes
