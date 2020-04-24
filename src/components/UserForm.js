import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
// importera scss fil

 function WarningBanner(props) {
     if (!props.warn) {
         return null;
    }
}

export default class UserForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        selectedSome: ''
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
            <div>
                <h5 class="banana">Select user type:</h5>
                <select onChange={this.selected}
                    defaultValue={this.state.selectedSome}>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>

                </select>

                {/* <DropdownButton id="dropdown" title="Choose user type" onChange={e => this.selected(e.value)}>
                    <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Referee</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Player</Dropdown.Item>
                </DropdownButton> */}
                <form>
                    <input
                        name="firstName"
                        placeholder='First Name'
                        value={this.state.firstName}
                        onChange={e => this.change(e)} /><br/>
                    <input
                        name="lastName"
                        placeholder='Last Name'
                        value={this.state.lastName}
                        onChange={e => this.change(e)} /><br/>
                    <input
                        name="email"
                        placeholder='Enter email'
                        value={this.state.email}
                        onChange={e => this.change(e)} /><br/>
                    <input
                        name="phoneNumber"
                        placeholder='Phone number...'
                        value={this.state.phoneNumber}
                        onChange={e => this.change(e)} /><br />
                    <input
                        name="team"
                        placeholder='Team'
                        value={this.state.phoneNumber}
                        onChange={e => this.change(e)} /><br/>
                    
                        <button onClick={e => this.onSubmit(e)}>Add</button> 
                </form>
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

 