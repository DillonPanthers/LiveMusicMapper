const express = require('express');
const morgan = require('morgan');

const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./api');

const socketUtils = require('./socketUtils');

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`app is listening at port ${port}!`);
});

const io = require('socket.io')(server);
let sockets = [];

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('attachUserId', ({ info }) => {
        sockets.push(info);
        socketUtils.setSockets(sockets);

        socket.on('disconnect', () => {
            sockets = sockets.filter((s) => s.socketId !== socket.id);
            socketUtils.setSockets(sockets);
            console.log(sockets);
        });
    });
});

app.use('/api', router);

// Error hander
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({ error: err.message });
});

// Handle 404
app.use((req, res, next) => {
    res.status(404).send('<h1> Page not found</h1>');
});
