const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectID } = require('mongodb')

let QuerySchema = new Schema({
    user_id: {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    time_of_ques: {
        type: Date,
        default: Date()
    },
    answers: [{
        answer: {
            type: String,
        },
        answered_by: {
            type: ObjectID,
            ref: 'User'
        },
        time_of_ans: {
            type: Date,
            default: Date()
        }  
    }]
});

module.exports = mongoose.model('Query', QuerySchema);