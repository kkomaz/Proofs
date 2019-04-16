/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import _ from 'lodash'
 import * as blockstack from 'blockstack'
import { MyContext } from 'components/User/UserProvider'
import Icon from 'components/Icon'
import Modal from 'react-bulma-components/lib/components/modal';
import { Input } from 'react-bulma-components/lib/components/form'
import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button'
import { withRouter } from 'react-router-dom'
import './AdminUser.scss'

const usernameExists = (accounts, service) => {
  const user = _.find(accounts, (account) => account.service === service) || {}
  return user.identifier
}

class AdminUser extends Component {
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
    loading: true,
  }

  componentDidMount = async () => {
    const { match, history } = this.props
    const { currentUser } = this.context.state
    const options = { decrypt: false }
    const postOptions = { encrypt: false }

    if (match.params.username !== currentUser.username) {
      history.push(`/app/${currentUser.username}`)
    }
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
        loading: false,
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
        loading: false,
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

  render() {
    const {
      accounts,
      description,
      imgUrl,
      name,
      showNameModal,
      showDescriptionModal,
      showProofModal,
      loading,
    } = this.state

    const services = _.map(accounts, 'service')

    return (
      <div id="wrapper" className="admin-user">
					<section id="main">
						<header>
							<span class="avatar">
                <img
                  src={!loading && (imgUrl || 'https://i.imgur.com/w1ur3Lq.jpg')}
                  alt=""
                  style={{ height: '150px', width: '150px'}}
                />
              </span>
              <div className="admin-user__name mt-two mb-one">
                <h1>
                  {
                    !loading && (name || 'Enter name here...')
                  }
                </h1>
                <Icon
                  className="icon-pencil"
                  icon="IconPencil"
                  onClick={this.openNameModal}
                  size={18}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: '-15px',
                  }}
                />
              </div>
              <div className="admin-user__description">
                {
                  _.isEmpty(description) ?
                  <p style={{ opacity: 0.5 }}>Add some info to your profile</p> : <p>{description}</p>
                }
                <Icon
                  className="icon-pencil"
                  icon="IconPencil"
                  onClick={this.openDescriptionModal}
                  size={18}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: '-15px',
                  }}
                />
              </div>
						</header>
						<hr />
						<hr />
						<footer className="admin-user__footer">
							<ul class="icons admin-user__icons">
                <li>
                  <i
                    onClick={() => this.openProofModal('twitter')}
                    href="#"
                    class="fa-twitter"
                    style={{
                      background: _.includes(services, 'twitter') && !_.isEmpty(usernameExists(accounts, 'twitter')) ? '#aec3cf' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    Twitter
                </i>
                </li>
								<li>
                  <i
                    onClick={() => this.openProofModal('instagram')}
                    href="#"
                    class="fa-instagram"
                    style={{
                      background: _.includes(services, 'instagram') && !_.isEmpty(usernameExists(accounts, 'instagram')) ? '#aec3cf' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    Instagram
                  </i>
                </li>
                <li>
                  <i
                    onClick={() => this.openProofModal('github')}
                    href="#"
                    class="fa-github"
                    style={{
                      background: _.includes(services, 'github') && !_.isEmpty(usernameExists(accounts, 'github')) ? '#aec3cf' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    Github
                  </i>
                </li>
                <li>
                  <i
                    onClick={() => this.openProofModal('facebook')}
                    href="#"
                    class="fa-facebook"
                    style={{
                      background: _.includes(services, 'facebook') && !_.isEmpty(usernameExists(accounts, 'facebook')) ? '#aec3cf' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    Facebook
                  </i>
                </li>
                <li>
                  <i
                    onClick={() => this.openProofModal('linkedin')}
                    href="#"
                    class="fa-linkedin"
                    style={{
                      background: _.includes(services, 'linkedin') && !_.isEmpty(usernameExists(accounts, 'linkedin')) ? '#aec3cf' : 'inherit',
                      cursor: 'pointer'
                    }}
                  >
                    Linkedin
                  </i>
                </li>
							</ul>
						</footer>
					</section>

					<footer id="footer">
						<ul class="copyright">
							<li>&copy;</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</footer>
          <Modal
            show={showNameModal}
            onClose={this.closeNameModal}
            closeOnEsc
          >
            <Modal.Content>
              <Section style={{ background: 'white' }}>
                <h1 className="mb-one">Full Name</h1>
                <form className="admin-user__name-form" onSubmit={this.updateName}>
                  <Input
                    onChange={this.onNameChange}
                    value={this.state.inputName}
                    placeholder="Add your name here"
                  />
                  <div className="admin-user__name-form-buttons">
                    <Button
                      type="button"
                      className="mt-one"
                      onClick={this.onCancelNameChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="admin-user__save mt-one ml-one"
                      color="link"
                      style={{ color: 'white' }}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Section>
            </Modal.Content>
          </Modal>
          <Modal
            show={showDescriptionModal}
            onClose={this.closeDescriptionModal}
            closeOnEsc
          >
            <Modal.Content>
              <Section style={{ background: 'white' }}>
                <h1 className="mb-one">Description</h1>
                <form className="admin-user__name-form" onSubmit={this.updateDescription}>
                  <Input
                    onChange={this.onDescriptionChange}
                    value={this.state.inputDescription}
                    placeholder="Add your name here"
                  />
                  <div className="admin-user__name-form-buttons">
                    <Button
                      type="button"
                      className="mt-one"
                      onClick={this.onCancelDescriptionChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="admin-user__save mt-one ml-one"
                      color="link"
                      style={{ color: 'white' }}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Section>
            </Modal.Content>
          </Modal>
          <Modal
            show={showProofModal}
            onClose={this.closeProofModal}
            closeOnEsc
          >
            <Modal.Content>
              <Section style={{ background: 'white' }}>
                <h1 className="mb-one">Update Social Proof via <span>{this.state.currentProofType}</span></h1>
                <form className="admin-user__name-form" onSubmit={this.updateProof}>
                  <Input
                    onChange={this.onProofChange}
                    value={this.state.currentProofIdentity}
                    placeholder="Social Identity"
                  />
                  <div className="admin-user__name-form-buttons">
                    <Button
                      type="button"
                      className="mt-one"
                      onClick={this.onCancelProofChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="admin-user__save mt-one ml-one"
                      color="link"
                      style={{ color: 'white' }}
                      type="button"
                      onClick={this.updateProof}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Section>
            </Modal.Content>
          </Modal>
			</div>
    )
  }
}

export default withRouter(AdminUser)
AdminUser.contextType = MyContext
