const { Schema, Types } = require('mongoose');

const stepSchema = new Schema({
    stepId: {type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()},
    
    stepText:  {type: String,
        required: true,
        maxlength: 280},
},
{
    toJSON: {
        getters: true
    },
    id: false,
})


module.exports = stepSchema;