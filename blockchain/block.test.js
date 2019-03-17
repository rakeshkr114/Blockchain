const Block = require('./block');
const {DIFFICULTY} = require('../config');

describe('Block', ()=>{

    //declare variables
    let data, lastBlock, block;

    //Runs before each test cases, used to set variables
    beforeEach(()=>{
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    })

    //tes case
    it('sets the `data` to match the input', ()=>{
        expect(block.data).toEqual(data);
    });

    //test case
    it('sets the `lastHash` to match the hash of the last block', ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    //test case
    it('generates a hash that matches the difficulty', ()=> {
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
        console.log(block);
    });

});
