import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import mongoosy from 'mongoosy/frontend';
import RefereeContextProvider from './contexts/RefereeContextProvider'
import NewReferee from './pages/NewReferee'
import RefereeList from './components/RefereeList'
import NewTeam from './components/NewTeam';
import NewTeamMember from './components/NewTeamMember';
import Login from './components/Login'
import UserContextProvider from './contexts/UserContextProvider';
import TeamContextProvider, { TeamContext } from './contexts/TeamContextProvider';
import RegisterAccount from './components/RegisterAccount';
const {
  User,
  Team
} = mongoosy;

export default function App() {

  async function doStuff() {

    //await User.deleteMany({})
    // Use mongoose from the frontend
    // through mongoosy
    // let allUsers = await User.find();
    // console.log("users", allUsers)

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

    // // Read all teams from the db
    // let allTeams = await Team.find();
    // console.log('allTeams', allTeams.js);

  }

  doStuff();

  return (
    <div className="App">
      <TeamContextProvider>
        <UserContextProvider>
          <Router>
            <main>
              <Route exact path="/addTeam" component={NewTeam} />
              <Route
                exact
                path="/addTeamMember/:id"
                component={NewTeamMember}
              />
              <Login />
              {/* <Route exact path="/auth/register/" component={RegisterAccount} /> */}
            </main>
          </Router>
        </UserContextProvider>
      </TeamContextProvider>
    </div>
  );
}