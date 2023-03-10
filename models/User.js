const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minLength: 5 }
},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.verifyPassword = async function (password) {
    try {
        var result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        return error;
    }
};

userSchema.methods.signToken = async function () {
    const payload = { userId: this.id, email: this.email };
    try {
        var Token = await jwt.sign(payload, process.env.SECRET);
        return Token
    } catch (error) {
    }
    console.log(payload);
}

userSchema.methods.userJSON = function ( token ) {
    return {
        name: this.name,
        email: this.email,
        token: token
    }
}

module.exports = mongoose.model("User", userSchema)