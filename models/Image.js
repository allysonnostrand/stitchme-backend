const { Schema, Types } = require('mongoose');

const imageSchema = new Schema({
    imageId: {type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()},
    
    imageText:  {type: String,
        required: true,
        maxlength: 280},

    imageURL:  {type: String,
        required: true},

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


module.exports = imageSchema;