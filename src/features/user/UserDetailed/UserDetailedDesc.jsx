import React from "react";
import { Segment, Grid, Header, List, Icon, Item } from "semantic-ui-react";
import { format } from 'date-fns';

const UserDetailedDesc = ({ user }) => {
  let createdAt;
  if (user.createdAt) {
    createdAt = format(user.createdAt.toDate(), "DD/MM/YYYY");
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content="About Display Name" />
            <p>
              I am a: <strong>{user.occupation || "not mentioned"}</strong>
            </p>
            <p>
              Originally from <strong>{user.origin || "not mentioned"}</strong>
            </p>
            <p>
              Member Since:{" "}
              <strong>
                {createdAt}
              </strong>
            </p>
            <p>{user.about}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            <List>
              {user.interests &&
                user.interests.map((interest, i) => (
                  <Item key={i}>
                    <Icon name="heart" />
                    <Item.Content>{interest}</Item.Content>
                  </Item>
                ))}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDesc;
