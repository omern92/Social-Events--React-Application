import React, { Component } from 'react'
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import EventListAttendee from './EventListAttendee';
import { objectToArray } from '../../../app/common/util/helpers';

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    let eventDate;
    if (event.date) {
      eventDate = event.date.toDate();
    }
    
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <Link to={`profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                {event.cancelled &&
                  <Label style={{top: '-40px'}} ribbon="right" color="red" content="Event has been cancelled" />
                }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(eventDate, "Do MMMM")} at{" "}
            {format(eventDate, "HH:mm")} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map((attendee) => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          {event.description}
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;