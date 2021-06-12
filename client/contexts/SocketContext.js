import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

const socket = io(window.location.origin);

const SocketProvider = ({ children }) => {
    const [me, setMe] = useState('');

    useEffect(() => {
        socket.on('me', (id) => setMe(id));
    }, []);

    return (
        <SocketContext.Provider value={{ me }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
