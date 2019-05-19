import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { openModal } from '../../modals/modalsActions';
import SignedOut from '../Menus/SignedOut';
import SignedIn from '../Menus/SignedIn';

const actions = { 
  openModal,
 };

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

class NavBar extends Component {
  handleSignIn = () => {
    const { openModal } = this.props;
    openModal('LoginModal');
  };

  handleRegister = () => {
    const { openModal } = this.props;
    openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/people" name="People" />
          {authenticated &&
            <Menu.Item>
              <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event" />
            </Menu.Item>
          }
          {authenticated ? 
            <SignedIn 
              profile={profile}
              auth={auth}
              signout={this.handleSignOut}
            /> 
            :
            <SignedOut 
              signin={this.handleSignIn}
              register={this.handleRegister} 
            />
          }          
        
        </Container>
      </Menu>
    )
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      actions
    )(NavBar)
  )
);