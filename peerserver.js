const fs = require('fs');
const { PeerServer } = require('peer');

const peerServer = PeerServer({
    port: 3001,
    ssl: {
        key: fs.readFileSync('./ssl/key.pem', 'utf8'),
        cert: fs.readFileSync('./ssl/server.crt', 'utf8')
    }
});

peerServer.listen(() => {
    console.log("3001 peer")
})