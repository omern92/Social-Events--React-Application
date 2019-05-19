import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name='marker' size='big' color='red' />

const EventDetailedMap = ({ lat, lng }) => {
  const zoom = 11;
  return (
    <Segment attached="bottom" style={{padding: 0}}>
      <Grid verticalAlign="middle">
        <Grid.Column width={16}>
          <div style={{ height: '200px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCRd16D0tBrm-3i7nd7OTiwZ2nU730uxOU' }}
              defaultCenter={{ lat, lng }}
              defaultZoom={zoom}
            >
              <Marker
                lat={lat}
                lng={lng}
              />
            </GoogleMapReact>
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default EventDetailedMap
