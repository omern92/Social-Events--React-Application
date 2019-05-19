import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashBoard from '../../features/event/EventDashBoard/EventDashBoard';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import Test from '../../features/test/TestComp';
import ModalsManager from '../../features/modals/modalsManager';

function App() {
  return (
    <div>
      <ModalsManager />
      <NavBar />

      <Container className="main">
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route path='/test' component={Test} /> 
          <Route path='/events' component={EventDashBoard} /> 
          <Route path='/event/:id' component={EventDetailedPage} /> 
          <Route path='/manage/:id' component={EventForm} />           
          <Route path='/people' component={PeopleDashboard} /> 
          <Route path='/profile/:id' component={UserDetailedPage} /> 
          <Route path='/settings' component={SettingsDashboard} /> 
          <Route path='/createEvent' component={EventForm} /> 
        </Switch>
      </Container>

    </div>
  );
}

export default App;
