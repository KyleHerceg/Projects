import React from 'react';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';

import './EmployeeList.css';

const PageHolder = styled(Paper)({
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: '60vh',
  padding: '0 30px',
  marginTop: '1vw',
  marginLeft: '20vw',
  marginRight: '20vw',
  overflow:'scroll',
  display: 'flex',
  flexDirection: 'column',
});

const SubmitButton = styled(Button)({
  height: '4vh',
  background: 'blue',
  color: 'white',
  marginTop: '4vw',
  marginBottom: '4vw',
  padding: '0px 50px'
});

const sendLocation = "URL"; //Send location for data [Permissions / Onboarder / Time Stamp]
const getLocation = "URL"; //Get location for data [Employees]

var employeeNumber = 0; // Responsible for assigning each employee listed a unique key 

//Test JSON inout 
const json = '{"people": [{"eid": "Wiggins1","email": "Nora.Vazquez@.name.com","fullName": "Eliza Brown","jobTitle": "ex sint elit","orgUnit": "IDEALIS","coc": "CoC: 01","bu": "cillum laborum velit","dept": "quis ea duis","location": "704 Summit Street, Savannah","phone": "(979) 478-3390","mobile": "(861) 527-3852","reportsTo": "Luz Rutledge"},{"eid": "Wiggins1","email": "Nora.Vazquez@.name.com","fullName": "David Brimmer","jobTitle": "Programmer Specialist","orgUnit": "IDEALIS","coc": "CoC: 01","bu": "cillum laborum velit","dept": "quis ea duis","location": "704 Summit Street, Savannah","phone": "(979) 478-3390","mobile": "(861) 527-3852","reportsTo": "Luz Rutledge"}]}';

export default class EmployeeList extends React.Component {

	constructor(props)
	{

		super(props);

		//init state with employees onboarder and manager values 
		this.state = {
			employees: JSON.parse(json).people, 
			onboarder: null,
			manager: null
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getFormatedDate = this.getFormatedDate.bind(this);
	}

	getFormatedDate() //Make a time stamp and return it 
	{
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd = '0'+dd
		} 

		if(mm<10) {
		    mm = '0'+mm
		} 

		var dayFormat = mm + '/' + dd + '/' + yyyy + "  ";
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 
		return dayFormat + time;
	}

	componentDidMount() { //On component rendering access query string and obtain manager / onboarder and make 'GET' request
	  console.log("Loaded");
	  const values = queryString.parse(this.props.location.search);

	  this.setState({ 
	  	manager: values.manager,
	  	onboarder: values.employee
	  });

	  //Get employees reporting to manager and set them inside state 
	  /*
	  fetch(getLocation)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            employees: result.people,
	          });
	        },
	       

	        (error) => {
	          //error handling 
	          console.log("Error Fetching Data");
	        }
	     )
	   */

	}

	handleClick(i){ //Change button color and flag on click 
		if(i.flag === true)
		{
			i.flag = false;
			i.color = '#F3F3F3';
		}
		else
		{
			i.flag = true;
			i.color = '#98FB98';
		}

		this.setState({});
	};

	handleSubmit(){ //Determine if each employee listed is flagged, if so then append them to similar_permissions table 
		
		if(this.state.employees != null){

			var permissions = {
				newEmployee: this.state.onboarder,
				similar_permissions: [],
				post_time: this.getFormatedDate()
			};

			for(var i = 0; i < this.state.employees.length; i++)
			{
				if(this.state.employees[i].flag === true)
				{
					permissions.similar_permissions.push(this.state.employees[i].eid);
				}
			}

			if(permissions.similar_permissions.length === 0)
			{
				//Add functionality to force admin to choose at least one person 
			}

			var toSend = JSON.stringify(permissions); //convert data table to JSON 
			console.log(toSend);

			//Send data 

			/*
			fetch(sendLocation, { //Send data
		      method: 'POST',
		      mode: 'no-cors',
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },

		      //make sure to serialize your JSON body
		      body: toSend
		      })
		      .then( (response) => { 
		         console.log("Sent Request")
		      });   
		    }  
		    */
		}

	};

	createEmployee = (item) => //Returns an employee button with name and job title and attaches a click event 
	{
		employeeNumber++;
		return (
				<button key = {employeeNumber} className = "employee_button" style = {{fontSize: '2vh',background : item.color}} onClick = {() => this.handleClick(item)} variant="contained">
		        	{item.fullName}
		        	<h1 style = {{color: 'black'}} className = "employee_desc"> {item.jobTitle} </h1>
		      	</button>
			);
	}


	render(){
		if(this.state.employees != null){
			var employeeList = this.state.employees.map(this.createEmployee); // Upon first rendering construct list of employee buttons 
		}

		return(

		<div>

			<h1 style = {{fontSize: '2vh', margin: '30px', color: 'black'}}> Select similar permissions to give to {this.state.onboarder}: </h1>
			<h1 style = {{fontSize: '2vh', margin: '30px', color: 'orange'}}> Employees reporting to {this.state.manager}:  </h1>

			<PageHolder> 

					{employeeList}

			 </PageHolder>

			 <SubmitButton onClick = {this.handleSubmit} variant = "contained"> Submit </SubmitButton> 

		</div>

		)
	}
}