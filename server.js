'use strict'

const io = require('socket.io')();
const port = 3033;

let fs = require('fs');
let path = require('path');
const programDir = './programs';


io.on('connection', (client) => {
    console.log('Client connected with Id: ' + client.id);

    // Get all file names
    client.on('get-program-list', () => {

        console.log('get-program-list');
        fs.readdir(programDir, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(files);
            client.emit('program-list', { programs: files });
        });
    });

    // Get the file content by given file name
    client.on('get-program-content', (filename) => {

        console.log('get-program-content');
        fs.readFile(`${programDir}/${filename}`, 'utf-8', (err, content) => {
            if (err) {
                console.error(err);
                return;
            }
            client.emit('program-content', { content: content });
        });
    });

    // Create an empty file
    client.on('create-file', (filename) => {

        console.log('create-file');

        fs.writeFile(`${programDir}/${filename}`, '', (err) => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
    });
});

StartServer();


function StartServer() {
    io.listen(port);
    console.log('Socket.io listening on port ', port);
}
