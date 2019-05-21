import React from 'react';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import { Card, Image } from 'semantic-ui-react';

const CardComponent = ({ events }) => {
  return (
    <Card.Group itemsPerRow={3}>
    {events &&
      events.length > 0 &&
      events.map(event => (
        <Card as={Link} to={`/event/${event.id}`} key={event.id}>
          <Image src={`/assets/categoryImages/${event.category}.jpg`} />
          <Card.Content>
            <Card.Header textAlign="center">{event.title}</Card.Header>
            <Card.Meta textAlign="center">
            <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
            <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
            </Card.Meta>
          </Card.Content>
        </Card>
      ))}
  </Card.Group>
  )
}

export default CardComponent;