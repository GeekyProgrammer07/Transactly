const {Schema, model} = require('mongoose')

const accountSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    balance: {
        type: Number, 
        required: true
    }
})

const Account = model('Account', accountSchema);

module.exports = Account;