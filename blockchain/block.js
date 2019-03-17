const SHA256 = require('crypto-js/sha256');

const {DIFFICULTY} = require('../config'); //Difficulty level for proof of work system

class Block{
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce; // Including nonce, to implement proof of work system to make miners come up with required hash to a block.
    }

    toString(){
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0,10)}
            Hash     : ${this.hash.substring(0,10)}
            Data     : ${this.data}
            Nonce    : ${this.nonce}`;
    }

    // The Genesis block to start the block chain with dummy lastHash and other values
    static genesis(){
        return new this('Genesis time', '-----', 'f1sd33-dj23', [], 0); // default nonce value = 0
    }

    //mine Blocks to create new blocks in the chain
    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;

        //const hash = Block.hash(timeStamp, lastHash, data) //hash from hashing fn.

        let timeStamp, hash, nonce = 0;
        do{
            //keep incrementing nonce value until we find a hash value with leading 0's = DIFFICULTY level
            nonce++; 
            timeStamp = Date.now();
            hash = Block.hash(timeStamp, lastHash, data, nonce) //hash from hashing fn.
        }while (hash.substring(0,DIFFICULTY) !== '0'.repeat(DIFFICULTY));   // when hash != required pattern
        

        return new this(timeStamp, lastHash, hash, data, nonce);
    }


    static hash(timestamp, lastHash, data, nonce){
        //combining arguments to create a single string and getting the hash in string(not object) fromat
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block){
        const {timestamp, lastHash, data, nonce} = block; // assigning data from Object with same variable name!!!
        return Block.hash(timestamp, lastHash, data, nonce); // Generate hash, will return different hash if "data" is changed
    }

}
module.exports = Block;
