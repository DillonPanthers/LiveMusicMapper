let _sockets = [];
const setSockets = (sockets) => {
    _sockets = sockets;
};
const getSockets = () => {
    return _sockets;
};

module.exports = {
    getSockets,
    setSockets,
};
