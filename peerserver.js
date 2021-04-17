const fs = require('fs');
const { PeerServer } = require('peer');

const peerServer = PeerServer({
    port: 443,
    ssl: {
        key: fs.readFileSync('./ssl/privatekey.pem', 'utf8'),
        cert: fs.readFileSync('./ssl/server.crt', 'utf8')
    }
});

peerServer.listen(() => {
    console.log("3001 peer")
})
