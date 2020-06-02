import React, { useContext } from "react";
import { ThemeProvider } from "./contexts/ThemeContextProvider";
import { ThemeContext } from "./contexts/ThemeContextProvider";
import { LoginProvider } from "./contexts/LoginContextProvider";
import LoginHeader from "./components/UserLogin";
import mongoosy from "mongoosy/frontend";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RefereeContextProvider from "./contexts/RefereeContextProvider";
import NewReferee from "./components/NewReferee";
import NewTeam from "./components/NewTeam";
import NewTeamMember from "./components/NewTeamMember";
import UserContextProvider from "./contexts/UserContextProvider";
import ArenaContextProvider from "./contexts/ArenaContextProvider";
import FieldContextProvider from "./contexts/FieldContextProvider";
import TeamContextProvider from "./contexts/TeamContextProvider";
import MatchContextProvider from "./contexts/MatchContextProvider";
import NewArena from "./components/NewArena";
import CreateBrackets from "./components/CreateBrackets";
import PlayerInfo from "./components/PlayerInfo";
import UserLogin from "./components/UserLogin";
import GroupPlay from "./components/GroupPlay";
const { Login, User } = mongoosy;
// import NewMatch from './components/NewMatch'

export default function App() {
  async function doStuff() {
    // await Team.deleteMany({})
    // Use mongoose from the frontend
    // through mongoosy
    // Create a new admin and save to db
    // let anAdmin = new Admin({ name: 'Olle' });
    // await anAdmin.save();
    // // after saving the admin it has an id
    // console.log('anAdmin', anAdmin.js);
    // Read all admins from the db
    // let allAdmins = await Admin.find();
    // console.log('allAdmins', allAdmins.js);
    // Create a new team and save to db
    // let aTeam = new Team({ name: 'IFK', gender: 'Female', age: 9 });
    // await aTeam.save();
    // // after saving the team it has an id
    // console.log('aTeam', aTeam.js);
    // // Read that team again from the db
    // let foundTeam = await Team.findOne({ _id: aTeam._id });
    // console.log('foundTeam', foundTeam.js);
    // let allUsers = await User.find();
    // console.log('allUsers', allUsers.js);
    // await User.deleteMany({})
  }

  doStuff();

  return (
    <div className="App">
      <ThemeProvider>
        <LoginProvider>
          <div>
            <body>
              <LoginHeader />
            </body>
          </div>
          <MatchContextProvider>
            <TeamContextProvider>
              <UserContextProvider>
                <RefereeContextProvider>
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
                          <Link to="/groupPlay">Group Play</Link>|
                          {/* <Link to="/newMatch">New NewMatch</Link> */}
                          <Route exact path="/addTeam" component={NewTeam} />
                          <Route
                            exact
                            path="/addTeamMember/:id"
                            component={NewTeamMember}
                          />
                          <Route
                            exact
                            path="/newReferee"
                            component={NewReferee}
                          />
                          <Route exact path="/newArena" component={NewArena} />
                          <Route
                            exact
                            path="/createBrackets"
                            component={CreateBrackets}
                          />
                          <Route
                            exact
                            path="/playerInfo"
                            component={PlayerInfo}
                          />
                          <Route
                            exact
                            path="/userLogin"
                            component={UserLogin}
                          />
                          <Route
                            exact
                            path="/groupPlay"
                            component={GroupPlay}
                          />
                          {/* <Route exact path="/newMatch" component={NewMatch} /> */}
                        </main>
                      </Router>
                    </FieldContextProvider>
                  </ArenaContextProvider>
                  x{" "}
                </RefereeContextProvider>
              </UserContextProvider>
            </TeamContextProvider>
          </MatchContextProvider>
        </LoginProvider>
      </ThemeProvider>
    </div>
  );
}
