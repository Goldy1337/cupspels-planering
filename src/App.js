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
import MatchContextProvider from './contexts/MatchContextProvider'
import NewArena from './components/NewArena';
import CreateBrackets from './components/CreateBrackets'
import PlayerInfo from './components/PlayerInfo'
import UserLogin from './components/UserLogin'
import GroupPlay from './components/GroupPlay'


export default function App() {

  return (
    <div className="App">
      <TeamContextProvider>
        <UserContextProvider>
          <RefereeContextProvider>
            <MatchContextProvider>
            <ArenaContextProvider>
              <FieldContextProvider>
                <Router>
                  <main>
                    <Link to="/userLogin">Login</Link>|
                    <Link to="/addTeam"> Add Team </Link>|
                    <Link to="/newReferee"> Add Referee </Link>|
                    <Link to="/newArena"> Add Arena </Link>|
                    <Link to="/createBrackets">Create Brackets</Link>|
                    <Link to="/playerInfo">Player Info</Link>|
                    <Link to="/groupPlay">Group Play</Link>
                    <Route exact path="/addTeam" component={NewTeam} />
                    <Route
                      exact
                      path="/addTeamMember/:id"
                      component={NewTeamMember}
                    />
                    <Route exact path="/newReferee" component={NewReferee} />
                    <Route exact path="/newArena" component={NewArena} />
                    <Route exact path="/createBrackets" component={CreateBrackets} />
                    <Route exact path="/playerInfo" component={PlayerInfo} />
                    <Route exact path="/userLogin" component={UserLogin} />
                    <Route exact path="/groupPlay" component={GroupPlay}/>
                    
                  </main>
                </Router>
              </FieldContextProvider>
              </ArenaContextProvider>
              </MatchContextProvider>
          </RefereeContextProvider>
        </UserContextProvider>
      </TeamContextProvider>
    </div>
  );
}