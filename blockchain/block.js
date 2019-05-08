const ChainUtil = require('../chain-util');

const {DIFFICULTY, MINE_RATE} = require('../config'); //Difficulty level for proof of work system

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce; // Including nonce, to implement proof of work system to make miners come up with required hash to a block.
        this.difficulty = difficulty || DIFFICULTY;   // if difficulty not specified, use default value from config
    }

    toString(){
        return `Block -
            Timestamp   : ${this.timestamp}
            Last Hash   : ${this.lastHash.substring(0,10)}
            Hash        : ${this.hash.substring(0,10)}
            Nonce       : ${this.nonce}
            Difficulty  : ${this.difficulty}
            Data        : ${this.data}`;
    }

    // The Genesis block to start the block chain with dummy lastHash and other values
    static genesis(){
        return new this('Genesis time', '-----', 'f1sd33-dj23', [], 0, DIFFICULTY); // default nonce value = 0, DIFFICULTY from config
    }

    //mine Blocks to create new blocks in the chain
    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;

        //const hash = Block.hash(timestamp, lastHash, data) //hash from hashing fn.

        let timestamp, hash, nonce = 0;
        let { difficulty } = lastBlock; // assign difficulty value from lastBlock object

        /** Solve Proof of work algorithm */
        do{
            //keep incrementing nonce value until we find a hash value with leading 0's  = DIFFICULTY level
            nonce++; 
            timestamp = Date.now();

            difficulty = Block.adjustDifficulty(lastBlock, timestamp);  // adjust difficulty level for each timestamp

            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty) //hash from hashing fn.
        } while (hash.substring(0,difficulty) !== '0'.repeat(difficulty));   // when hash != required pattern
        

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }


    static hash(timestamp, lastHash, data, nonce, difficulty){
        //combining arguments to create a single string and getting the hash in string(not object) fromat
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block){
        const {timestamp, lastHash, data, nonce, difficulty} = block; // assigning data from Object with same variable name!!!
        return Block.hash(timestamp, lastHash, data, nonce, difficulty); // Generate hash, will return different hash if "data" is changed
    }

    /* Increase difficulty if difference between timestamps of last block and new/current block is bigger than the mine rate
    *  Decrease the difficulty as it took long time.
    *  Similarly, Incerease the difficulty, if difference is lower.
    */
    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = (lastBlock.timestamp + MINE_RATE) > currentTime ? (difficulty + 1) : (difficulty - 1);
        return difficulty;
    }

}
module.exports = Block;
