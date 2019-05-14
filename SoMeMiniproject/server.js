/*
nodemon server.js ----- to start the server
*/

const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');


const app = express();

app.use(bodyParser.json())
//app.use(cors());

app.use((req, res, next) => {
	console.log('<h1>HHHHHEEEEEEELLLOOOO</h1>');
	next();
})

const database = {
	users: [ // array of objects
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: '1234',
			entries: 0, // how many times something has been done by the user
			joined: new Date() // will be used whenever it is run
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: '4321',
			entries: 0, // how many times something has been done by the user
			joined: new Date() // will be used whenever it is run
		}
	],
	login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}
	]
}

app.get('/', (req, res) => {
	//res.send(database.users);
	res.send('TESTTEST');
})


// json (feature for 'response') instead of send has some extra features
app.post('/signin', (req, res) => {

	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json('Success');
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;

	database.users.push(		{
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0, // how many times something has been done by the user
			joined: new Date() // will be used whenever it is run
		})
		res.json(database.users[database.users.length-1]); // returns the last member of the users array			
})


app.get('/profile/:id', (req, res) => {
	const {id} = req.params; // sets the id variable to be equal to the input
	let found = false;

	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if(!found) {
		res.status(400).json('not found');
	}
})


app.put('/image', (req, res) => {
	const {id} = req.body; // sets the id variable to be equal to the input
	let found = false;

	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		} 
	})
		if(!found) {
		res.status(400).json('image not found');
	}
})


app.listen(3001, function() { /* Listens for a server on the port 3000 */
	console.log("app is running on port 3000");
});


