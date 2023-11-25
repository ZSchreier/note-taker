// This file is borrowed and utilized from the mini-project for this unit

const fs = require('fs');

// This function provides a shorthand 'syntactic sugar' for fs.readFile that can be used in the routing portion of the code
function readFromFile(filename, encoding = "utf-8", cb = null){
  fs.readFile(filename, encoding, (err, data) => {
    if(cb){
      cb(err, data)
    } else {
      if( err ) return console.log(err)
      return data
    }
  })
}

// This function provides 'syntactic sugar' for fs.writeFile to be used in routing
function writeToFile(filename, data, cb = null){
  const stringedData = JSON.stringify(data, null, 4)
  fs.writeFile(filename, stringedData, (err) => {
    if( cb ) return cb(err)
    if( err ) console.info(`\nData written to ${filename}`)
  })
}

// This function combines the readFromFile and writeToFile functions to be used in our POST route. This code reads the notes from the file, parses it, and then adds the new note to the parsed data and re-writes the file with everything in it
function readAndAppend(newData, filename, cb = null){
  readFromFile(filename, 'utf8', (err, oldData) => {
    if (err) return console.error(err);
    const parsedData = JSON.parse(oldData);
    parsedData.push(newData);
    writeToFile(filename, parsedData);
  });
}


module.exports = { readFromFile, writeToFile, readAndAppend };
