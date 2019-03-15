const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0,10)}
            Hash     : ${this.hash.substring(0,10)}
            Data     : ${this.data}`;
    }

    // The Genesis block to start the block chain with dummy lastHash and other values
    static genesis(){
        return new this('Genesis time', '-----', 'f1sd33-dj23', []);
    }

    //mine Blocks to create new blocks in the chain
    static mineBlock(lastBlock, data){
        const timeStamp = Date.now();
        const lastHash = lastBlock.hash;

        const hash = Block.hash(timeStamp, lastHash, data) //hash from hashing fn.

        return new this(timeStamp, lastHash, hash, data);
    }


    static hash(timestamp, lastHash, data){
        //combining arguments to create a single string and getting the hash in string(not object) fromat
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        const {timestamp, lastHash, data} = block; // assigning data from Object with same variable name!!!
        return Block.hash(timestamp, lastHash, data); // Generate hash, will return different hash if "data" is changed
    }

}
module.exports = Block;
