import React from "react";
import mongoosy from "mongoosy/frontend";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NewReferee from "./components/NewReferee";
import NewTeam from "./components/NewTeam";
import NewTeamMember from "./components/NewTeamMember";
import UserContextProvider from "./contexts/UserContextProvider";
import NewArena from "./components/NewArena";
import CreateBrackets from "./components/CreateBrackets";
import PlayerInfo from "./components/PlayerInfo";
import UserLogin from "./components/UserLogin";
import GroupPlay from "./components/GroupPlay";
import GlobalContext from "./contexts/GlobalContextProvider";
import CupGenerator from "./components/CupCreation/CupCreator";

// import Home from './pages/Home'

export default function App() {
  return (
    <div className="App">
      <GlobalContext>
        <UserContextProvider>
          <Router>
            <main>
              <Link to="/userLogin">Login</Link>|
              <Link to="/addTeam"> Add Team </Link>|
              <Link to="/newReferee"> Add Referee </Link>|
              <Link to="/newArena"> Add Arena </Link>|
              <Link to="/createBrackets">Create Brackets</Link>|
              <Link to="/playerInfo">Player Info</Link>|
              <Link to="/groupPlay">Group Play</Link>|
              <Link to="/CupGenerator">Cup Creator</Link>|
              {/* <Link to="/newMatch">New NewMatch</Link> */}
              <Route exact path="/addTeam" component={NewTeam} />
              <Route
                exact
                path="/addTeamMember/:id"
                component={NewTeamMember}
              />
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/newReferee" component={NewReferee} />
              <Route exact path="/newArena" component={NewArena} />
              <Route exact path="/createBrackets" component={CreateBrackets} />
              <Route exact path="/playerInfo" component={PlayerInfo} />
              <Route exact path="/userLogin" component={UserLogin} />
              <Route exact path="/CupGenerator" component={CupGenerator} />
            </main>
          </Router>
        </UserContextProvider>
      </GlobalContext>
    </div>
  );
}
