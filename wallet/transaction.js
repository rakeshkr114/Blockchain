const ChainUtil = require("../chain-util");

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;  // to be updated
        this.outputs = [];   //  how much currency the sender will have after the transaction is complete || how much currency the sender wants to send to an individual
    }

    static newTransaction(senderWallet, recipient, amount){
        const transaction = new this();
        if(amount > senderWallet.balance){
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        transaction.outputs.push(...[       // push the following objects into array, one by one
            {amount: senderWallet.balance - amount, address: senderWallet.publicKey},  // how much currency the sender will have after the transaction is complete 
            {amount, address: recipient}  //how much currency the sender wants to send to an individual
        ])

        return transaction;
    }
}

module.exports = Transaction;