const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }	
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.get('/users/:name/:job', (req, res) => {
    const name = req.params['name'];
	const job = req.params['job'];//or req.params.id
    
	let result = findUserByNameAndJob(name, job);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
	
	var uadded = {
	  id: guid(),
	  name: userToAdd.name,
	  job: userToAdd.job
	};
	
    addUser(uadded);
    res.status(201).send(uadded);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
	console.log("Mohamed");
    let result = findUserById(id);
    
	if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
		remove(result);
        res.status(204).end();
    }
});



const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

function findUserByNameAndJob(name, job) {
    return users['users_list'].find( (user) => user['name'] === name && user['job'] === job); 
}
	
function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); 
}

function addUser(user){
    users['users_list'].push(user);
}

function remove(user) {
    users['users_list'].splice(users['users_list'].indexOf(user), 1);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4();
}