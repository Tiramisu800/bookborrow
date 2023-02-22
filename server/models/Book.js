const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required'
    },
    author:{
        type: String,
        required: 'This field is required'
    },
    description:{
        type: String,
    },
    review:{
        type: String
    },
    owner_name:{
        type: String,
        required: 'This field is required'},
    owner_telegram:{
        type: String,
        required: 'This field is required'
    },
    owner_email:{
        type: String,
        required: 'This field is required'
    },
    borrows:{
        borrow_status:{
            type: String,
            required: 'This field is required'
        },
        start_date: {
            type: Date
        },
        finish_date: {
            type: Date
        },
        borrower: {
            borrower_name: String,
            borrower_telegram: String,
            borrower_email: String
        }
    },
    image:{
        type:String
    }
});
bookSchema.index({name:'text', description:'text'});
//WildCard Indexing
// bookSchema.index("$**":'text'})

module.exports = mongoose.model('Book', bookSchema)