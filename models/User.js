const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {type: String,
        required: true,
        minlength: 8
    },

    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'project'
    }],
},
{
    toJSON: {
    },

    id: false,
});


const User = model('user', userSchema);

module.exports = User;