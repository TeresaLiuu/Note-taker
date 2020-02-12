'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(__dirname + '/assets'));


const dbNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, './db.json'), (err, data) => {
        if (err) throw err;
    })
);
const dbUpdate = dbNotes => {
    fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(dbNotes),
        err => {
            if (err) throw err;
        })
};

//routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './assets/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './assets/notes.html'));
});

app.get('/api/notes', (req, res) => {
    return res.json(dbNotes);
});

// posting and deleting the notes
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let id = dbNotes.length;
    newNote.id = id + 1;
    dbNotes.push(newNote);
    dbUpdate(dbNotes);
    return res.json(dbNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let x =1 ;
    delete dbNotes[id - 1];
    dbUpdate(dbNotes);
    res.send(dbNotes);
});



// //listener
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));




