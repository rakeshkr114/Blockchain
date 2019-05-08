const uuidV1 = require('uuid/v1'); //Now uuidV1 is a function which generates an unique ID based on current timestamp
const EC = require('elliptic').ec; //class takes one string argument :  what curve based cryptography implementation to use
const ec = new EC("secp256k1");   //Standard of Efficient Cryptography Prime 256-bits K-kobletts(Mathametician) 1-Fisrt implementation of curve algo in this standard
const SHA256 = require('crypto-js/sha256');

    
class ChainUtil {
    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidV1();    // call the fun. and return the ID
    }

    //hash function  as Static method to reuse the hashing code
    static hash(data){  //generate a hash of string/number/javascropt Object or others
        return SHA256(JSON.stringify(data)).toString();
    }
}

module.exports = ChainUtil;