const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain'); // will get index.js by default.(Our Blockchainclass file)

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

//to use json format in request body
app.use(bodyParser.json());

app.get('/blocks', (req, res)=>{
    res.json(bc.chain);
});

app.post('/mine', (req, res)=>{
    const block = bc.addBlock(req.body.data);       // add new block to the blockchain
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks'); // wil call the get method on '/bocks'
});

app.listen(HTTP_PORT, ()=> console.log(`Listening on port ${HTTP_PORT}`)); // Use back ticks to resolve variables
