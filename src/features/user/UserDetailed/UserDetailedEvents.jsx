import React from "react";
import { Grid, Segment, Header, Tab } from 'semantic-ui-react';
import Cards from './CardComponent';

// TODO: Add Pagination.

const panes = [
  { menuItem: 'All Events',  render: ({events}) => <Cards events={events} /> },
  { menuItem: 'Past Events', render: ({events}) => <Cards events={events} /> },
  { menuItem: 'Future Events', render: ({events}) => <Cards events={events} /> },
  { menuItem: 'Events Hosted', render: ({events}) => <Cards events={events} /> },
];

const UserDetailedEvents = ({ events, eventsLoading, handleTabChange }) => {
  console.log('events from UserDetailed', events);

  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Events" />
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
          events={events}
          onTabChange={handleTabChange}
        />
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
