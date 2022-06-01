const { Schema, Types } = require('mongoose');

const todoSchema = new Schema({
    todoId: {type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()},
    
    todoText:  {type: String,
        required: true,
        maxlength: 280},

    username: {type: String,
        ref: 'user',
        required: true},

    createdAt: {type: Date,
        default: Date.now,
        get: (date) => {
            return date.toString()}},
},
{
    toJSON: {
        getters: true
    },
    id: false,
})


module.exports = todoSchema;