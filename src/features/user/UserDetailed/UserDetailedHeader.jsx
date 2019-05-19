import React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';
import { differenceInYears } from 'date-fns';

const UserDetailedHeader = ({ user }) => {
  let dateOfBirth;
  if (user.dateOfBirth) {
    dateOfBirth = user.dateOfBirth.toDate();
  }

  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={user.photoURL || '/assets/user.png'}
            />
            <Item.Content verticalAlign="bottom">
              <Header as="h1">{user.displayName}</Header>
              <br />
              <Header as="h3">{user.occupation || null}</Header>
              <br />
              <Header as="h3">{differenceInYears(Date.now(), dateOfBirth) || 'Unknown age'}, Lives in {user.city || 'unknown city'}.</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailedHeader;
