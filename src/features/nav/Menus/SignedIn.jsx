import React from 'react'
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SignedIn = ({ auth, profile, signout }) => {

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={profile.photoURL || '/assets/user.png'} />
      <Dropdown style={{paddingRight: '15px'}} pointing="top left" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item as={NavLink} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
          <Dropdown.Item text="Settings" icon="settings"
            as={NavLink} to="/settings" />
          <Dropdown.Item text="Sign Out" icon="power"
            onClick={signout} 
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}

export default SignedIn
