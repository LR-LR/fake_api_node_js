// Modules
const express = require('express');
const http = require('http');

// Application
const app = express();

// Port d'écoute
const port = 3000;

// Utilisateurs et publcations
let users = require('./users');
let publications = require('./publications');


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
});

// USERS
// GET sur /users, retourne tous les utilisateurs
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

// GET sur /users/:id, retourne l'utilisateur possédant l'id <:id>
app.get('/users/:id', (req, res) => {
    let userId = req.params.id;

    let user = users.find(
        (user) => {
            return user.id == userId;
        }
    );

    if (user) {
        res.status(200).send(user);
    } else {
        res.statusMessage = 'No user with this ID have been found';
        res.status(404).send();
    }
});

// POST sur /users avec un paramètre name et un nouvel ID 
app.post('/users', (req, res) => {
    let user = {
        name: req.query.name,
        id: users[users.length - 1].id + 1
    };
    users.push(user);
    res.status(200).send(user);
});

// PUT sur /users, modifie l'attribut name de l'utilisateur avec l'id demandé
app.put('/users', (req, res) => {
    let userId = parseInt(req.query.userId);
    let newName = req.query.name;

    let index = users.findIndex(
        (user) => {
            return user.id === userId;
        }
    );

    if (index !== -1) {
        users[index].name = newName;
        res.status(200).send(users[index]);
    } else {
        res.statusMessage = 'No user with this ID have been found';
        res.status(404).send();
    }
});

// DELETE sur /users, supprime l'utilisateur ayant l'id userId
app.delete('/users', (req, res) => {
    let userId = parseInt(req.query.userId);

    let userReturned = users.find(
        (user) => {
            return user.id === userId;
        }
    );

    if (userReturned) {
        users.splice(userId, 1);
        console.log(userReturned);
        res.status(200).send(userReturned);
    } else {
        res.statusMessage = 'No user with this ID have been found';
        res.status(404).send();
    }
});


// POSTS
// GET sur /publications?userId=X
app.get('/publications', (req, res) => {
    let userId = parseInt(req.query.userId);

    let userPublications = publications.filter(
        (publication) => {
            return publication.userId == userId;
        }
    );

    res.status(200).send(userPublications);
});


// Lancement du serveur et écoute du port
app.listen(port, () => console.log(`Listening on port ${port} !`));