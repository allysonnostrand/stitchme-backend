const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt")

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

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password") ) {
        const saltRounds = 5
        this.password = await bcrypt.hash(this.password, saltRounds)
        }
            next();
})

userSchema.methods.isCorrectPassword = async function(password) {
   return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema);

module.exports = User;