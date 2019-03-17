const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// Commands to execute instances of applications on different port
//linux:  HTTP_PORT=3002 P2P_PORT=5002  PEERS=ws://localhost:5001,ws://localhost:5001 npm run dev
//Win cmd command: set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5001 && npm run dev

// List of websocket addresses, if env variablee doesn't have assign empty array to peers addresses
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];  


class P2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];  // List of connected web servers
    }

    listen(){
        const server = new Websocket.Server({port : P2P_PORT}); //creating a websocket server on specified port

        //When successfully connected to this server, add the socket to sockets array
        server.on('connection', socket => this.connectSocket(socket));
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);

        this.connectToPeers();
    }

    connectToPeers(){
        peers.forEach(peer => {
            // ws://localhost:5001
            const socket = new Websocket(peer); // pass websocket address to create a socket

            //event listener: call callback fn. once it's open
            socket.on('open', ()=> this.connectSocket(socket));
        });
    }

    connectSocket(socket){
        //adding the socket to sockets array
        this.sockets.push(socket);
        console.log('Socket connected');

        //message handler
        this.messageHandler(socket);

        //sending message(current chain) to all the connected peers [Note: inside forEach loop]
        //socket.send(JSON.stringify(this.blockchain.chain));
        this.sendChain(socket);
    }

    //whenever message(chain of other app's instances) comes to the this socket-server, log it
    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message);
            //console.log('data',data);

            //on receiving chain, call replaceChain fn. to replace it with longest chain!
            this.blockchain.replaceChain(data);
        });
    }

    //method to send message(current chain) to the specified socket
    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    //To sync chains across the network, send the new current chain to all the connected peers
    syncChains(){
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

module.exports=P2pServer;