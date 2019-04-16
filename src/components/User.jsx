/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import _ from 'lodash'
 import * as blockstack from 'blockstack'
import { MyContext } from 'components/User/UserProvider'
import { withRouter } from 'react-router-dom'
import './AdminUser.scss'

class User extends Component {
  state = {
    accounts: [],
    description: '',
    imgUrl: '',
    name: '',
    inputName: '',
    inputDescription: '',
    currentProofIdentity: '',
    currentProofType: '',
    showNameModal: false,
    showDescriptionModal: false,
    showProofModal: false,
  }

  componentDidMount = async () => {
    const { match } = this.props
    const { currentUser } = this.context.state
    const options = { decrypt: false, username: match.params.username }
    const postOptions = { encrypt: false }
    const identity = await currentUser.userSession.getFile('identity-profile.json', options)

    if (!identity) {
      const userData = await currentUser.userSession.loadUserData()
      const profile = userData.profile
      var person = new blockstack.Person(profile)
      var imgUrl = person.avatarUrl()
      const accounts = _.map(profile.account, (account) => {
        return {
          service: account.service,
          identifier: account.identifier,
        }
      })

      const params = {
        accounts,
        description: '',
        imgUrl,
        name: _.get(userData, 'profile.name', ''),
        inputName: _.get(userData, 'profile.name', ''),
        inputDescription: '',
      }

      await currentUser.userSession.putFile('identity-profile.json', JSON.stringify(params), postOptions)

      this.setState(params)
    } else {
      const { accounts, description, imgUrl, name, inputName, inputDescription } = JSON.parse(identity)
      this.setState({
        accounts,
        description,
        imgUrl,
        name,
        inputName,
        inputDescription,
      })
    }
  }

  onCancelNameChange = () => {
    this.setState({
      inputName: this.state.name
    })
    this.closeNameModal()
  }

  closeNameModal = () => {
    this.setState({ showNameModal: false })
  }

  openNameModal = () => {
    this.setState({ showNameModal: true })
  }

  onNameChange = (e) => {
    this.setState({ inputName: e.target.value })
  }

  updateName = (e) => {
    e.preventDefault()
    const { currentUser } = this.context.state
    const options = { encrypt: false }

    this.setState({
      name: this.state.inputName,
    }, async () => {
      await currentUser.userSession.putFile('identity-profile.json', JSON.stringify(this.state), options)
      this.closeNameModal()
    })
  }

  onCancelDescriptionChange = () => {
    this.setState({
      inputDescription: this.state.name
    })
    this.closeDescriptionModal()
  }

  closeDescriptionModal = () => {
    this.setState({ showDescriptionModal: false })
  }

  openDescriptionModal = () => {
    this.setState({ showDescriptionModal: true })
  }

  onDescriptionChange = (e) => {
    this.setState({ inputDescription: e.target.value })
  }

  updateDescription = (e) => {
    e.preventDefault()
    const { currentUser } = this.context.state
    const options = { encrypt: false }

    this.setState({
      description: this.state.inputDescription,
    }, async () => {
      await currentUser.userSession.putFile('identity-profile.json', JSON.stringify(this.state), options)
      this.closeDescriptionModal()
    })
  }

  onCancelProofChange = () => {
    this.setState({
      currentProofIdentity: '',
      currentProofType: '',
    })
    this.closeProofModal()
  }

  closeProofModal = () => {
    this.setState({ showProofModal: false })
  }

  openProofModal = (type) => {
    const account = _.find(this.state.accounts, (a) => a.service === type)

    if (account) {
      this.setState({
        showProofModal: true,
        currentProofIdentity: account.identifier,
        currentProofType: account.service,
      })
    } else {
      this.setState({
        showProofModal: true,
        currentProofIdentity: '',
        currentProofType: type,
      })
    }
  }

  onProofChange = (e) => {
    this.setState({ currentProofIdentity: e.target.value })
  }

  updateProof = (e) => {
    e.preventDefault()
    const { currentUser } = this.context.state
    let newAccounts
    const options = { encrypt: false }
    const { accounts, currentProofIdentity, currentProofType } = this.state

    const account = _.find(this.state.accounts, (a) => a.service === currentProofType)

    if (account) {
      newAccounts = _.reduce(accounts, (acc, curr) => {
        if (currentProofType === curr.service) {
          return [...acc, { service: currentProofType, identifier: currentProofIdentity }]
        }

        return [...acc, curr]
      }, [])
    } else {
      newAccounts = [...this.state.accounts, { service: currentProofType, identifier: currentProofIdentity }]
    }

    this.setState({
      accounts: newAccounts,
    }, async () => {
      await currentUser.userSession.putFile('identity-profile.json', JSON.stringify(this.state), options)
      this.setState({
        currentProofIdentity: '',
        currentProofType: '',
      }, () => {
        this.closeProofModal()
      })
    })
  }

  urlRoute = (account) => {
    const { service } = account

    if (service === 'github') {
      return `https://github.com/${account.identifier}`
    }

    if (service === 'twitter') {
      return `https://twitter.com/${account.identifier}`
    }

    if (service === 'facebook') {
      return `https://facebook.com/${account.identifier}`
    }

    if (service === 'instagram') {
      return `https://instagram.com/${account.identifier}`
    }

    if (service === 'linkedin') {
      return `https://linkedin.com/in/${account.identifier}`
    }
  }

  render() {
    const {
      description,
      imgUrl,
      name,
    } = this.state

    return (
      <div id="wrapper" className="admin-user">
					<section id="main">
						<header>
							<span class="avatar">
                <img
                  src={imgUrl}
                  alt=""
                  style={{ height: '150px', width: '150px'}}
                />
              </span>
              <div className="admin-user__name mt-two mb-one">
                <h1>
                  {name}
                </h1>
              </div>
              <div className="admin-user__description">
                <p>{description}</p>
              </div>
						</header>
						<hr />
						<hr />
						<footer className="admin-user__footer">
							<ul class="icons admin-user__icons">
                {
                  _.map(this.state.accounts, (account) => {
                    if (account.service !== 'bitcoin' && account.service !== 'hackerNews' && !_.isEmpty(account.identifier)) {
                      return (
                        <li>
                          <a
                            href={this.urlRoute(account)}
                            target="_blank"
                            rel='noreferrer noopener'
                            class={`fa-${account.service}`}
                            style={{
                              background: '#aec3cf',
                            }}
                            >
                            Twitter
                          </a>
                        </li>
                      )
                    }
                  })
                }
							</ul>
						</footer>
					</section>

					<footer id="footer">
						<ul class="copyright">
							<li>&copy;</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</footer>
			</div>
    )
  }
}

export default withRouter(User)
User.contextType = MyContext
