'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
app.get('/assets/css/styles.css', (req, res) =>
  res.sendFile(path.join(__dirname, './assets/css/styles.css'))
);

app.get('/assets/js/index.js', (req, res) =>
  res.sendFile(path.join(__dirname, './assets/js/index.js'))
);

app.get('/', (req,res) =>{
    const absolutePath = path.join(__dirname, './assets/index.html');
    res.sendFile(absolutePath);
});

app.get('/notes', (req,res)=>{
    const absolutePath = path.join(__dirname, './assets/notes.html');
    res.sendFile(absolutePath);
});

app.get('/api/notes', (req,res) =>{
    let notes = '';
    fs.readFile('db.json','utf8',(err,data)=>{
        if (err) throw err;
        
    });
});

app.post ('/api/notes', (req,res) =>{
    const newNotes = req.body;
    let notes = '';
    fs.readFile('./db.json', 'utf8', (err,data)=>{
        if (err) throw err;
        notes = JSON.parse (data);
        notes.push(newNotes);
        fs.writeFile('./db.json', JSON.stringify(notes),'utf8',err=>{
            if (err) throw 'something is wrong';
        });
        
    });
    res.sendFile(path.join(__dirname, './assets/notes.html'));
})





//listener
app.listen(PORT,() => console.log(`App listening on port ${PORT}`));