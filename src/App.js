import React, {useContext} from 'react';
import { ThemeProvider } from './contexts/ThemeContextProvider'
import { ThemeContext } from './contexts/ThemeContextProvider'
import { LoginProvider } from './contexts/LoginContextProvider'
import LoginHeader from './components/UserLogin'
import mongoosy from 'mongoosy/frontend';
const {
  Login,
  User 
} = mongoosy;


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
    <ThemeProvider>
      <LoginProvider>
      <div>
        <body>
        <LoginHeader />
        </body>
        </div>
        </LoginProvider>
      </ThemeProvider>
  );
}