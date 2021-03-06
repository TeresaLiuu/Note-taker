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

app.get('*', (req,res) =>{
    res.send(`<h1> 404 Error.  Page does not exist</h1>`)
})


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
    let id = parseInt(req.params.id);
    for (let i = 0; i < dbNotes.length; ++i) {
        const note = dbNotes[i];
        if (id === note.id){
            dbNotes.splice(i, 1);
            break;    
        }
    }
    dbUpdate(dbNotes);
    res.send(dbNotes);

});



//listener
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));



