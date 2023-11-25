
// These are the node packages and require statements necessary for running this app
const express = require("express")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

const { readFromFile, readAndAppend } = require('./helpers/fsHelpers');

const app = express()
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

// This is the homepage GET route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// This is the note page GET route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// This route reads the db.json file and sends back the note information for the left-side column
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json', "utf-8", (err, data) => res.json(JSON.parse(data)) )
});

// This is the post route for adding a new note. It first organizes the sent data into a new variable and then invokes the readAndAppend function to read the db.json file, adds the new note to the list, and then rewrites the file
app.post('/api/notes', (req, res) => {
  const { title, text} = req.body;
  if (req.body) {
    const newNote = { title, text, id: uuidv4() };
    readAndAppend(newNote, './db/db.json', res.json(`Note added successfully`));
  } else {
    res.error('Error in adding note');
  }
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));