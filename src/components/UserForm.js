import React from 'react';
import mongoosy from 'mongoosy/frontend';
import { DropdownButton, Dropdown } from 'react-bootstrap';
const {
  User
} = mongoosy;


function WarningBanner(props) {
     if (!props.warn) {
         return null;
    }
};

async function uploadData() {


    // if (this.state.firstName == '') {
    //     console.log("empty")
    // }
    console.log('Uploading data');

    // Create a new referee and save to db
    let newReferee = new User({ name: this.state.firstName, role: "Referee", email: "morris@gmail.com", phoneNumber: 12332131, password: "secret-code", salt: "salty" });
    await newReferee.save();

    console.log('newReferee', newReferee.js); // after saving the team it has an id

    // Read that team again from the db
    let foundReferee = await User.findOne({ _id: newReferee._id });
    console.log('found Referee', foundReferee.js);

    // Read all teams from the db
    let allReferees = await User.find();
    console.log('all Referees', allReferees.js);



}

export default class UserForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dropdownSelection: ''
    }

    // Update states
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    selected = (value) => {
        console.log(value.target.value)
        this.setState({
            selectedSome: value.target.value
        })
        // this.setState({
        //     [selectedSome]: value
        // })
    }

    onSubmit = (e) => {
        console.log(this.state)
        uploadData();
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            teamId: '',
        })
    };

    

    render() {
        return (
            <div class="userform-base">
                <h2 class="userform-title">Registration Form</h2>
                <h5>Add players or referees to your turnament.</h5>
                <h5 class="userform-select">User type:</h5>
                <select onChange={this.selected}
                    defaultValue={this.state.dropdownSelection}>
                    <option value="Referee">Referee</option>
                    <option value="Player">Player</option>
                </select>

            
                {/* <DropdownButton id="dropdown" title="Choose user type" onChange={e => this.selected(e.value)}>
                    <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Referee</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Player</Dropdown.Item>
                </DropdownButton> */}
                <form class="user-form">
                    <br />
                    <div class="name-input">
                        <label class="name-label" for="fname">Full Name</label><br/>
                        <input
                            class="fname-field"
                            name="firstName"
                            id="fname"
                            value={this.state.firstName}
                            onChange={e => this.change(e)} />
                        <input
                            name="lastName"
                            value={this.state.lastName}
                            onChange={e => this.change(e)} /><br />
                        <label class="fname-label" for="fname">First name</label>
                        <label class="lname-label" for="lname">Last name</label><br/>
                    </div>
                    
                    <div>
                        <label class="contact-label" for="email">Contact Details:</label><br/>
                        <input
                            id="email"
                            class="email-field"
                            name="email"
                            placeholder='Example@gmail.com'
                            value={this.state.email}
                            onChange={e => this.change(e)} /><br/>
                        <label class="lname-label" for="email">Email</label><br/>

                        <input
                            name="phoneNumber"
                            id="phone"
                            value={this.state.phoneNumber}
                            onChange={e => this.change(e)} /><br />
                        <label class="lname-label" for="phone">Phone number</label><br/>

                    </div>
                  
                    <input
                        name="team"
                        placeholder='Team'
                        value={this.state.phoneNumber}
                        onChange={e => this.change(e)} /><br/>
                </form>
                <div class="button-container">
                    <button class="submit-btn" onClick={e => this.onSubmit(e)}>Add</button> 
                </div> 
            </div>
        )
    };
}

// export default function FormReferee() {
//     state = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//     }
//     return (
//         <div>
//             <h1>Enter referee information: </h1>
//             <form>
//                 <label for="fname">First name:</label><br/>
//                 <input type="text" id="fname" name="fname" /><br/>
//                 <label for="lname">Last name:</label><br />
//                 <input type="text" id="lname" name="lname" /><br/>
//                 <label for="email">Email:</label><br/>
//                 <input type="email" id="remail" name="remail" /><br />
//                 <label for="phone">Phone number:</label><br/>
//                 <input type="tel" id="phone" name="phone"/><br/>
//                 <input type="submit" value="Submit"/>
//             </form>
//         </div>
       
//     )
// }

 