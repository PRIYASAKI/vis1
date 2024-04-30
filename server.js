const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store game sessions
let gameSessions = {};

// Function to generate a random 6-digit code
function generateGameCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Handle new game creation
app.get('/createGame', (req, res) => {
    let gameCode = generateGameCode();
    gameSessions[gameCode] = {
        players: []
    };
    res.send(gameCode.toString());
});

// Handle joining existing games
app.get('/joinGame', (req, res) => {
    let gameCode = req.query.code;
    if (gameSessions[gameCode]) {
        // Redirect to the game page if the game code is correct
        res.sendFile(path.join(__dirname, 'public', 'game.html'));
    } else {
        res.status(404).send('Game not found');
    }
});

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
