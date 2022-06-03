const { Schema, model } = require('mongoose');
const imageSchema = require('./Image')
const todoSchema = require('./Todo')
const stepSchema = require('./Step')

const projectSchema = new Schema({
    title: {type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },

    username: {type: String,
        ref: 'user',
        required: true
    },

    images: [imageSchema],


    todos: [todoSchema],


    steps: [stepSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },

    id: false,
});

const Project = model('project', projectSchema);

module.exports = Project;