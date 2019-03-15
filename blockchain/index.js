const Block = require('./block');

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data); // (lastBlock, data)
        this.chain.push(block);
        return block;
    }

    // Validate a chain
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) // should start with genesis
            return false;
        
        for(let i=1; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(block.lastHash !== lastBlock.hash ||     // lastHash should be = to last block's hash
               block.hash !== Block.blockHash(block)){  // Check if data is tempered as hash value should be same for same data
                   return false;
               }
        }
        return true;
    }

    //Replace the current chain if the new chain is longer.
    replaceChain(newChain){
        if(newChain.length <= this.chain.length){   // check for length
            console.log('Received chain is not longer than the current chain');
            return;
        } else if(!this.isValidChain(newChain)){        // check for validation
            console.log('The received chain is not valid');
            return;
        }

        console.log('Replacing blockchain with new chain.');
        this.chain = newChain;
    }
}

module.exports = Blockchain;