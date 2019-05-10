var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
	{
		"id": "12345",
		"text": "Eggs"
	},
	{
		"id": "78945",
		"text": "Milk bitch"
	},
	{
		"id": "48953",
		"text": "honey"
	},
	{
		"id": "48956",
		"text": "nuts"
	},
];

app.get('/ingredients', (req, res) => { /* '/' represents the base URL */
	res.send(ingredients);
});

app.get('/funions', (req, res) => {
	res.send('Give some funions you fucker');
});

app.post('/ingredients', (req, res) => {
	var ingredient = req.body;
	if(!ingredient || ingredient.text === "") {
		res.status(500).send({error: "Your ingredient must have text"});
	} else {
		ingredients.push(ingredient);
		res.status(200).send(ingredients);
	}
});

app.put('/ingredients/:ingredientId', (req, res) => { /* updating information. ingredientId is a parameter that takes on the value specified by the user */
	var newText = req.body.text; /* Sets the var to be equal to the user defined ingredient */

	if(!newText || newText ==="") { /* if statement to make sure the input from the user is valid */
		res.status(500).send({error: "You must provide ingredient text"}); /* Sends an error message if input is invalid */
	} else {
			for(var x = 0; x < ingredients.length; x++) { /* Goes through the list of ingredients */
				var ing = ingredients[x];

				if(ing.id === req.params.ingredientId) { /* Checks if it is the right ingredient */
					ingredients[x].text = newText; /* Changes the text of the ingredient to the user input */
					break;
				}
			}

			res.send(ingredients); /* Sends the ingredient list to the website */
	}


});

app.listen(3000, function() { /* Listens for a server on the port 3000 */
	console.log("First API running on port 3000");
});

var numberOfIntegers 