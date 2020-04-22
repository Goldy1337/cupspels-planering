import React from 'react'
import { model } from 'mongoose';


const NewTeam = () => {

  

        // const team = {
        //     name, 
        //     gender,
        //     age
        // }

        // const postTeam = async () => {
            let team = {
              name: 'IFK Malmö',
              gender: 'Male',
              age: 15
            }
        

        const postTeam = async () => {
        let result = await fetch('/api/teams', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
          })
        
          result = await result.json()
          console.log(result);

        }

        postTeam()

        // var teamInstance = new model.team({
        //     name: 'IFK Malmö',
        //     gender: 'Male',
        //     ange: 15
        // })

        // teamInstance.save(function (err) {
        //     if (err) return console.log('error');
        //   });
    
}

export default NewTeam();