const EC = require('elliptic').ec; //class takes one string argument :  what curve based cryptography implementation to use
const ec = new EC("secp256k1");   //Standard of Efficient Cryptography Prime 256-bits K-kobletts(Mathametician) 1-Fisrt implementation of curve algo in this standard
    
class ChainUtil {
    static genKeyPair(){
        return ec.genKeyPair();
    }
}

module.exports = ChainUtil;