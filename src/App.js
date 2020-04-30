import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import mongoosy from 'mongoosy/frontend';
import RefereeContextProvider from './contexts/RefereeContextProvider'
import NewReferee from './components/NewReferee'
import RefereeList from './components/RefereeList'
import NewTeam from './components/NewTeam';
import NewTeamMember from './components/NewTeamMember';
import UserContextProvider from './contexts/UserContextProvider';
import ArenaContextProvider from './contexts/ArenaContextProvider';
import FieldContextProvider from './contexts/FieldContextProvider';
import TeamContextProvider, { TeamContext } from './contexts/TeamContextProvider';
import NewArena from './components/NewArena';
const {
  //User,
  Team
} = mongoosy;

export default function App() {

  return (
    <div className="App">
      <TeamContextProvider>
        <UserContextProvider>
          <RefereeContextProvider>
          <ArenaContextProvider>
          <FieldContextProvider>
            <Router>
              <main>
                <Route exact path="/addTeam" component={NewTeam} />
                <Route
                  exact
                  path="/addTeamMember/:id"
                  component={NewTeamMember}
                />
                <Route exact path="/newReferee" component={NewReferee} />
                <Route exact path="/newArena" component={NewArena} />
              </main>
            </Router>
            </FieldContextProvider>
            </ArenaContextProvider>
          </RefereeContextProvider>
        </UserContextProvider>
      </TeamContextProvider>
    </div>
  );
}