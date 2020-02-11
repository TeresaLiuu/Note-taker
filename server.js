'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/assets', express.static(__dirname + '/assets'));

//routes

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './assets/index.html'));
});

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, './assets/notes.html'));
});

app.get('/api/notes', (req,res) =>{
    let note = '';
    fs.readFile('./db.json','utf8',(err,data)=>{
        if (err) throw err; 
        note = JSON.parse (data);
        fs.writeFile('./db.json', JSON.stringify(note),'utf8',err=>{
            if (err) throw 'something is wrong';
        });   
    });
});

app.post ('/api/notes', (req,res) =>{
    const newNote = req.body;
    let note = '';
    fs.readFile('./db.json', 'utf8', (err,data)=>{
        if (err) throw err;
        note = JSON.parse (data);
        note.push(newNote);
        fs.writeFile('./db.json', JSON.stringify(note),'utf8',err=>{
            if (err) throw 'something is wrong';
        });
        
    });
    res.sendFile(path.join(__dirname, './assets/notes.html'));
});







// //listener
app.listen(PORT,() => console.log(`App listening on port ${PORT}`));




