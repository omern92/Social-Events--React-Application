import React from 'react'
import { Menu, Button } from 'semantic-ui-react';

const SignedOut = ({ signin, register }) => {
  
  return (
      <Menu.Item position="right">
        <Button basic inverted content="Login"
          onClick={signin} 
        />
        <Button basic inverted content="Register" style={{marginLeft: '0.5em'}} 
          onClick={register}
        />
      </Menu.Item>
  )
}

export default SignedOut
