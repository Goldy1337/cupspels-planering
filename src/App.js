import React from 'react';
import NewArena from './components/Arena';
import NewField from './components/Field';
import mongoosy from 'mongoosy/frontend';
const {
  User,
  Team
} = mongoosy;

export default function App() {

  async function doStuff() {

    await Team.remove({})
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
    let aTeam = new Team({ name: 'IFK', gender: 'Female', age: 9 });
    await aTeam.save();
    // after saving the team it has an id
    console.log('aTeam', aTeam.js);

    // Read that team again from the db
    let foundTeam = await Team.findOne({ _id: aTeam._id });
    console.log('foundTeam', foundTeam.js);

    // Read all teams from the db
    let allTeams = await Team.find();
    console.log('allTeams', allTeams.js);

  }

  doStuff();

  return (
    <div>
      <h1>Hello world!</h1>
      <NewArena></NewArena>
      <NewField></NewField>
    </div>
  );
}