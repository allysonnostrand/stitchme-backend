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

userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(5, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error){
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}

const User = model('user', userSchema);

module.exports = User;