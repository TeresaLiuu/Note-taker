'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
app.get('/', (req,res) =>{
    const absolutePath = path.join(__dirname, './assets/index.html');
    res.sendFile(absolutePath);
});

app.get('/notes', (req,res)=>{
    const absolutePath = path.join(__dirname, './assets/notes.html');
    res.sendFile(absolutePath);
});

app.get('/api/notes', (req,res) =>{
    let notes;
    fs.readFile('db.json','utf8',(err,data)=>{
        if (err) throw err;
        notes = data;
        res.json(JSON.parse(notes));
    });
});

app.post ('/api/notes', (req,res) =>{
    const newNotes = req.body;
    let notes;
    fs.readFile('bd.json', 'utf8', (err,data)=>{
        if (err) throw err;
        notes = JSON.parse (data);
        fs.writeFile('bd.json', JSON.stringify(notes),'utf8',err=>{
            if (err) throw 'something is wrong';
        });
        
    })
})





//listener
app.listen(PORT,() => console.log(`App listening on port ${PORT}`));