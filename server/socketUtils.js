let _sockets = [];
const setSockets = (sockets) => {
    _sockets = sockets;
};
const getSockets = () => {
    return _sockets;
};

const getSingleSocket = (friendId) => {
    const socketObj = _sockets.filter((s) => {
        return s.userId === friendId;
    });
    return socketObj[0] ? socketObj[0].socketId : undefined;
};

module.exports = {
    getSockets,
    setSockets,
    getSingleSocket,
};
