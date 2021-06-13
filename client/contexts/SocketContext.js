import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

const socket = io(window.location.origin);

const SocketProvider = ({ children }) => {
    const [socketId, setSocketId] = useState('');

    useEffect(() => {
        socket.on('me', (socketId) => {
            setSocketId(socketId);
        });
    }, []);

    const attachUserId = (userId) => {
        const info = { socketId, userId };
        console.log(info);
        socket.emit('attachUserId', { info });
    };

    return (
        <SocketContext.Provider value={{ socketId, attachUserId }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
