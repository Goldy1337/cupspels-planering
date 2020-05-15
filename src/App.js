import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RefereeContextProvider from './contexts/RefereeContextProvider'
import NewReferee from './components/NewReferee'
import NewTeam from './components/NewTeam';
import NewTeamMember from './components/NewTeamMember';
import UserContextProvider from './contexts/UserContextProvider';
import ArenaContextProvider from './contexts/ArenaContextProvider';
import FieldContextProvider from './contexts/FieldContextProvider';
import TeamContextProvider from './contexts/TeamContextProvider';
import NewArena from './components/NewArena';
import CreateBrackets from './components/CreateBrackets'
import PlayerInfo from './components/PlayerInfo'

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
                    <Link to="/addTeam"> Add Team </Link>|
                    <Link to="/newReferee"> Add Referee </Link>|
                    <Link to="/newArena"> Add Arena </Link>
                    <Link to="/createBrackets">Create Brackets</Link>
                    <Link to="/playerInfo">Player Info</Link>
                    <Route exact path="/addTeam" component={NewTeam} />
                    <Route
                      exact
                      path="/addTeamMember/:id"
                      component={NewTeamMember}
                    />
                    <Route exact path="/newReferee" component={NewReferee} />
                    <Route exact path="/newArena" component={NewArena} />
                    <Route exact path="/createBrackets" component={CreateBrackets} />
                    <Route exact path="/playerInfo" component={PlayerInfo}/>
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